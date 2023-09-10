import mongoose, {Schema,Document, Model,model } from "mongoose";

interface Category extends Document {
    title:string,
    description:string,
    photo:string[],
    createdAt:Date,
    updatedAt:Date
}

const categorySchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:[{
        type:String
    }],
    createdAt:{
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

// const categoryModel= mongoose.model("categoryCollection",categorySchema)

const categoryModel:Model<Category> =model<Category>("categoryCollection",categorySchema)

export default categoryModel
