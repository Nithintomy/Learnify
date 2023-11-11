"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePayment = exports.key = exports.verifyPayment = exports.checkout = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const stripe_1 = __importDefault(require("stripe"));
const Courses_1 = __importDefault(require("../../model/Courses"));
const stripeSecretKey = process.env.STRIPE_KEY;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2023-10-16",
});
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.RAZORPAY_API_KEY) {
            console.error("RAZORPAY_API_KEY is not defined in the .env");
            process.exit(1);
        }
        const instance = new razorpay_1.default({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
            receipt: crypto_1.default.randomBytes(10).toString("hex"),
        };
        const order = yield instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.checkout = checkout;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query, "myrgtfaf");
    const { courseId, tutorId, studentId, amount } = req.query;
    // Now you can use these variables in your logic
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const crypto = require("crypto");
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            //database to save the order
            console.log(req.body, "haaaa");
            const order = yield orderModel_1.default.create({
                studentId,
                courseId,
                tutorId,
                amount,
            });
            yield order.save();
            yield Courses_1.default.findByIdAndUpdate(courseId, {
                $push: { students: studentId },
            });
            console.log("Order saved:", order);
            res.redirect(`http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`);
        }
        else {
            res.status(400).json({
                success: false,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Errorr");
    }
});
exports.verifyPayment = verifyPayment;
const key = (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};
exports.key = key;
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, "bodyyyy");
        const line_items = req.body.cartItems.map((item) => {
            var _a, _b, _c, _d;
            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: (_a = item === null || item === void 0 ? void 0 : item.course) === null || _a === void 0 ? void 0 : _a.courseName,
                        images: (_b = item === null || item === void 0 ? void 0 : item.course) === null || _b === void 0 ? void 0 : _b.photo,
                        description: (_c = item === null || item === void 0 ? void 0 : item.course) === null || _c === void 0 ? void 0 : _c.coursedescription,
                        metadata: {
                            id: item._id,
                        },
                    },
                    unit_amount: ((_d = item === null || item === void 0 ? void 0 : item.course) === null || _d === void 0 ? void 0 : _d.courseFee) * 100,
                },
                quantity: item === null || item === void 0 ? void 0 : item.quantity,
            };
        });
        const session = yield stripe.checkout.sessions.create({
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        console.log(session.payment_status, "status");
        if (session.payment_status === "unpaid") {
            const orderPromises = req.body.cartItems.map((cartItem) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const userId = cartItem === null || cartItem === void 0 ? void 0 : cartItem.user;
                const tutorId = (_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.course) === null || _a === void 0 ? void 0 : _a.tutor;
                const courseId = cartItem === null || cartItem === void 0 ? void 0 : cartItem.course._id;
                const amount = (_b = cartItem === null || cartItem === void 0 ? void 0 : cartItem.course) === null || _b === void 0 ? void 0 : _b.courseFee;
                const order = yield orderModel_1.default.create({
                    studentId: userId,
                    tutorId,
                    courseId,
                    amount,
                });
                yield order.save();
                yield Courses_1.default.findByIdAndUpdate(courseId, { $push: { students: userId } });
                console.log("Order saved:", order);
                return order;
            }));
            const orders = yield Promise.all(orderPromises);
            res.json({
                url: session.url,
                orderIds: orders.map((order) => order._id),
            });
        }
        else {
            res.status(400).json({ error: "Payment not completed yet." });
        }
    }
    catch (err) {
        console.error("Stripe Payment Error:", err);
        res.status(500).json({ error: "Payment error" });
    }
});
exports.stripePayment = stripePayment;
