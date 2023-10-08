import express from 'express';
import { checkout, verifyPayment,key } from '../../controller/PaymentController/PaymentController';


const paymentRouter = express.Router();


paymentRouter.post('/payment',checkout)

paymentRouter.post('/verifyPayment',verifyPayment)

paymentRouter.get('/getKey',key)


export default paymentRouter