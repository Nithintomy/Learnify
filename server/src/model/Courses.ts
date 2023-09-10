import mongoose,{Schema,Document,Model,model} from "mongoose";


interface Course extends Document{
    courseName:string,
    courseduration:number,
    coursedescription:string,
    category:mongoose.Schema.Types.ObjectId,
    photo:string,
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
        ref:"categoryCollection",
        required:true

    },
    isApproved:{
        type:Boolean,
        default:true
    },
    photo:[{
        type:String

    }],
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tutorCollection"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

    
})


// const courseModel =mongoose.model("courseCollection",coursemodel)

const courseModel:Model<Course> = mongoose.model<Course>("courseCollection",coursemodel)

 export default courseModel