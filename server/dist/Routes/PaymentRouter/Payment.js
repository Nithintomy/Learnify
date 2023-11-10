"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("../../controller/PaymentController/PaymentController");
const paymentRouter = express_1.default.Router();
paymentRouter.post('/payment', PaymentController_1.checkout);
paymentRouter.post('/verifyPayment', PaymentController_1.verifyPayment);
paymentRouter.get('/getKey', PaymentController_1.key);
paymentRouter.post('/stripePayment', PaymentController_1.stripePayment);
exports.default = paymentRouter;
