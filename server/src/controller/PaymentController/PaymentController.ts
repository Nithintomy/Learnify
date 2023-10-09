import { Request,Response } from 'express';
import Razorpay from 'razorpay'
import crypto from 'crypto'
import orderModel from '../../model/orderModel';


const checkout = async(req: Request, res: Response) => {
  
  
  
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
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex")
         
      };
     const order =await instance.orders.create(options)
     console.log(order)

     res.status(200).json({
      success:true,
      order
     })

  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
};

const verifyPayment = async(req: Request, res: Response) => {
  console.log(req.query,"myrgtfaf")
  const { courseId, tutorId, studentId, amount } = req.query;

  // Now you can use these variables in your logic

  try {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} =req.body
    const body =razorpay_order_id + "|" + razorpay_payment_id;

    const crypto = require('crypto')
    const expectedSignature =crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET)
                                 .update(body.toString())
                                .digest('hex')

     const isAuthentic = expectedSignature === razorpay_signature;

     if(isAuthentic){ 
      //database to save the order
      console.log(req.body,"haaaa")
   const order = await orderModel.create({
  studentId, 
  courseId,   
  tutorId,     
  amount,
});

      console.log("Order saved:", order);

      res.redirect(`http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`)
 
     }else{
      res.status(400).json({
        success:false,
        
       })
     }
                                
    

  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
};


const key =(req:Request,res:Response)=>{
  res.status(200).json({key:process.env.RAZORPAY_API_KEY})
}

export { checkout ,verifyPayment,key};
