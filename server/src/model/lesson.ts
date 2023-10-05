import mongoose, { Model, model } from "mongoose";

interface Lesson extends Document{
    title:string,
    courseName:string,
    duration:number,
    description:string,
    category:string,
    video:string[],
    tutorId:mongoose.Schema.Types.ObjectId

}


const lessonSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courseModel'
    },
   
    description:{
        type : String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'categorycollection',
        required: true,
    },
    video:[{
        type:String,
        required:true
    }],
    tutorId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"tutorModel"
    },
    isApproved:{
        type:Boolean,
        default:false

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

},{timestamps:true})



const lessonModel:Model<Lesson> =mongoose.model<Lesson>('lessonModel',lessonSchema)

export default lessonModel