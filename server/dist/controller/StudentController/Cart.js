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
exports.getItemsCart = exports.RemoveFromCart = exports.addToCart = void 0;
const cartModel_1 = __importDefault(require("../../model/cartModel"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("cart entry");
    try {
        const { courseId, userId, quantity } = req.body;
        const existingCartItem = yield cartModel_1.default.findOne({ user: userId, course: courseId });
        if (existingCartItem) {
            res.status(400).json({ message: "Course already in the cart" });
        }
        else {
            const newCartItem = new cartModel_1.default({
                user: userId,
                course: courseId,
                quantity
            });
            yield newCartItem.save();
            res.status(200).json({ message: "Course Added Successfully" });
        }
    }
    catch (error) {
        console.error("Error Occur while Adding to cart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addToCart = addToCart;
const RemoveFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItemId = req.params.cartItemId;
    try {
        yield cartModel_1.default.findByIdAndRemove(cartItemId);
        res.status(200).json({ message: "Course Removed from the cart" });
    }
    catch (error) {
        console.error("Error Removing Course From cart", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.RemoveFromCart = RemoveFromCart;
const getItemsCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("oiiiii");
    const userId = req.params.userId;
    console.log("userid vannu", userId);
    try {
        const cartItems = yield cartModel_1.default.find({ user: userId }).populate('course');
        console.log(cartItems, "items");
        res.status(200).json(cartItems);
    }
    catch (error) {
        console.error("Error fetching cart Items", error);
        res.status(500).json({ error: "Internal server Error" });
    }
});
exports.getItemsCart = getItemsCart;
