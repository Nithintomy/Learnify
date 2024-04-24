import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../../model/orderModel";
import Stripe from "stripe";
import courseModel from "../../model/Courses";

const stripeSecretKey = process.env.STRIPE_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

const checkout = async (req: Request, res: Response) => {
  try {
    if (!process.env.RAZORPAY_API_KEY) {
      console.error("RAZORPAY_API_KEY is not defined in the .env");
      process.exit(1);
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100), 
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await instance.orders.create(options);
    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const verifyPayment = async (req: Request, res: Response) => {
  console.log(req.query, "myrgtfaf");
  const { courseId, tutorId, studentId, amount } = req.query;

  // Now you can use these variables in your logic

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
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
      const order = await orderModel.create({
        studentId,
        courseId,
        tutorId,
        amount,
      });

      await order.save();

      await courseModel.findByIdAndUpdate(courseId, {
        $push: { students: studentId },
      });

      console.log("Order saved:", order);
    
      let redirectUrl;
      if (process.env.NODE_ENV === 'production') {
        redirectUrl = `https://learnify.website/paymentSuccess?reference=${razorpay_payment_id}`;
      } else {
        redirectUrl = `http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`;
      }
      res.redirect(redirectUrl);
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Errorr");
  }
};

const key = (req: Request, res: Response) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

const stripePayment = async (req: Request, res: Response) => {
  try {      
    console.log("enter")
    console.log(req.body, "bodyyyy");

    const line_items = req.body.cartItems.map((item: any) => {
      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item?.course?.courseName,
            images: item?.course?.photo,
            description: item?.course?.coursedescription,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item?.course?.courseFee * 100,
        },
        quantity: item?.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      success_url: process.env.NODE_ENV === 'production' ? `${process.env.CLIENT_URL}/paymentSuccess` : 'http://localhost:3000/paymentSuccess',

      cancel_url: process.env.NODE_ENV === 'production' ? `${process.env.CLIENT_URL}/cart` : 'http://localhost:3000/cart'
    });

    console.log(session.payment_status, "status");

    if (session.payment_status === "unpaid") {
      const orderPromises = req.body.cartItems.map(async (cartItem: any) => {
        const userId = cartItem?.user;
        const tutorId = cartItem?.course?.tutor;
        const courseId = cartItem?.course._id;
        const amount = cartItem?.course?.courseFee;

        const order = await orderModel.create({
          studentId: userId,
          tutorId,
          courseId,
          amount,
        });

        await order.save();

        await courseModel.findByIdAndUpdate(courseId, { $push: { students: userId } });

        console.log("Order saved:", order);
        return order;
      });

      const orders = await Promise.all(orderPromises);

      res.json({
        url: session.url,
        orderIds: orders.map((order) => order._id),
      });
    } else {
      res.status(400).json({ error: "Payment not completed yet." });
    }
  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ error: "Payment error" });
  }
};

export { checkout, verifyPayment, key, stripePayment };
