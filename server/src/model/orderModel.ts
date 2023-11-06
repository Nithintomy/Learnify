import mongoose, { Schema,Document,Model,model} from "mongoose";
import { Course } from "./Courses";


interface ORDER extends Document{
    studentId :mongoose.Schema.Types.ObjectId
    courseId:mongoose.Schema.Types.ObjectId | Course
    tutorId:mongoose.Schema.Types.ObjectId
    status:string
    amount:number
    createdAt:Date
    updatedAt:Date

}

 
const orderSchema = new Schema<ORDER>({
    
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"studentModel"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"courseModel",
    },
    tutorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"tutorModel"
    },
    amount:{
        type:Number,
        required:true

    },
    status:{
        type:String, 
        default:"success"

    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
},
{timestamps:true}

)

const orderModel :Model<ORDER> =mongoose.model<ORDER>("orderModel",orderSchema)

export default orderModel