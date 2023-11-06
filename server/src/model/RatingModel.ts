import mongoose, { Schema, Document, Model, model } from "mongoose";

interface Rating extends Document {
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId; // Reference to the course model
  timestamp: Date;
}

const ratingSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type:String,    
        required:true,
        maxlength:500  //maximum length of comment
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"studentModel",
        required:true,
        
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel",
        required:true,

    },
    timestamp:{
        type:Date,
        default:Date.now
    }

})


const RatingModel: Model<Rating> = mongoose.model<Rating>("Rating", ratingSchema);

export default RatingModel;