import express from 'express';
import { checkout, verifyPayment,key,stripePayment } from '../../controller/PaymentController/PaymentController';


const paymentRouter = express.Router();


paymentRouter.post('/payment',checkout)

paymentRouter.post('/verifyPayment',verifyPayment)

paymentRouter.get('/getKey',key)

paymentRouter.post('/stripePayment',stripePayment)




export default paymentRouter