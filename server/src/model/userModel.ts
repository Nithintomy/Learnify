
import mongoose,{Schema,Document,model,Model} from "mongoose";
import bcrypt from 'bcrypt';

//structure of a student document in monodb
export interface Student extends Document {
    studentName:string,
    studentRole: string,
    studentEmail:string,
    phone:number,
    password:string,
    photo:string[],
    courses:mongoose.Schema.Types.ObjectId,
    chats: mongoose.Schema.Types.ObjectId[]
    createAt:Date,
    updatedAt:Date,
    isBlocked:boolean,
    verifyToken:string,
    matchPassword(enteredPassword:string):Promise<boolean>

}


const userSchema = new Schema<Student>({
    studentName:{
        type:String,
        required:true
    },
    studentRole: {
        type: String, 
        required: true,
        default: "student", 
    },
    studentEmail:{
        type:String,
        required:true,
        unique:true   
    },
    phone: {
        type: Number, 
        unique: false, 
        max: 999999999999,  
    },
    password:{
        type:String,
        min:8
    },
    photo:[{
        type:String,
        default:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a9adeb42419075.57cc3f77ecae2.png",
    }],
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel"
    },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatModel"
        }
    ],
    isBlocked:{
        type:Boolean,
        required:true,
        default:false

    },
    createAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    verifyToken:{
        type:String
    }
},{timestamps:true})


  userSchema.methods.matchPassword = async function (enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
  }

  userSchema.pre<Student>('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt =await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt);
    next()

  })

// const studentModel = mongoose.model('studentCollection',userSchema)

const studentModel:Model<Student> = mongoose.model<Student>('studentModel',userSchema)
export default studentModel