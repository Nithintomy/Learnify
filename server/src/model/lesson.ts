import mongoose, { Model, model } from "mongoose";

interface Lesson extends Document{
    title:string,
    courseName:string,
    description:string,
    duration:number,
    category:string,
    video:string[],
    tutorName:string

}


const lessonSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CategoryCollection",
        required:true
    },
    video:[{
        type:String,
        required:true
    }],
    tutorName:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"tutorCollection"
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


// const lessonModel =mongoose.model("lessonCollection",lessonSchema)

const lessonModel:Model<Lesson> =mongoose.model<Lesson>('lessonCollection',lessonSchema)

export default lessonModel