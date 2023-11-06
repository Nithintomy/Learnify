import mongoose, { Model } from "mongoose";


interface CartItem extends Document {
    course:mongoose.Schema.Types.ObjectId
    user:mongoose.Schema.Types.ObjectId
    quantity:number
}

const cartItemSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel",
        requied:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"studentModel",
        requied:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
    

})


const CartItemModel :Model<CartItem>=mongoose.model<CartItem>("cartItemModel",cartItemSchema)

export default CartItemModel