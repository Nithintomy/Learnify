import mongoose,{Schema,Document,Model,model} from "mongoose";


export interface Course extends Document{
    courseName:string,
    courseduration:number,
    coursedescription:string,
    category:mongoose.Schema.Types.ObjectId,
    photo:string,
    courseFee:number,   
    tutor:string,
    createdAt:Date,
    updatedAt:Date

}

const coursemodel =new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseduration:{
        type:Number,
        required:true
    },
    coursedescription:{
        type: String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "categoryModel", 
        required: true
        

    },

    courseFee:{
        type:Number,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    photo:[{
        type:String

    }],
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tutorModel",
        required: false
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel',
      }],
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lessonModel',
      }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

    
})



const courseModel:Model<Course> = mongoose.model<Course>("courseModel",coursemodel)

 export default courseModel