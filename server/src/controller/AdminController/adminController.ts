import { Request,Response } from "express"
import studentModel from "../../model/userModel"
import TutorModel from "../../model/tutorModel"
import categoryModel from "../../model/categoryModel"




//admin Login
const adminLogin =async(req: Request,res:Response)=>{
    console.log("enter into itrr")
    
    try {
        const adminEmail = "nithintomy2255@gmail.com"
        const adminpassword = "12345"
        const {email,password} =req.body
        
        if(adminEmail===email && adminpassword===password){
            return res.status(200).json({
                message:"Login SuccessFully"
            })
        }else{
            return res.status(400).json({
                message:"Incorrect Details"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

// get all students 
const getStudentDetails =async(req:Request,res:Response)=>{
   
    try {
        const studentData =await studentModel.find().exec()
      

        if(studentData){
            res.status(200).json({
              studentData
            })
        }else{
            return res.status(400).json({
                message:"no users Found"
            })

        }
    } catch (error) {
        console.log(error)
    }
}

//get All tutor details
const getTutorDetails =async(req:Request,res:Response)=>{
    try {
        const TutorDetails = await TutorModel.find().exec()

        if(TutorDetails){
            res.status(200).json({
                TutorDetails
            })
        }else{
            res.status(400).json({
                message:"No TutorDetails Found"
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

//get All Catagories

const getAllCategory = async (req: Request, res: Response) => {
    try {
      const categoryDetails = await categoryModel.find().exec();
      if (categoryDetails) {
        console.log("Get all Category")

        res.status(200).json({
          categoryDetails,
        });
      } else {
        return res.status(400).json({
          message: "no users in this table",
        });
      }
    } catch (error) {
      console.log(error);
     
    }
  };

//block student
const blockStudent =async(req:Request,res:Response)=>{

    try {
        const { id } = req.params;

        console.log(id,"id")
    const user = await studentModel.findById(id);
    console.log(user,"user")

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    user.isBlocked = true;

    await user.save();

    return res.status(200).json({message:"User Blocked Successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error"})
        
    }
}

//unblock student 
const unblockStudent =async(req:Request,res:Response)=>{
    try {
        const {id} =req.params;

        const user =await studentModel.findById(id)

        if(!user){
            return res.status(400).json({message:"User not Found"})
        }

        user.isBlocked =false;

        await user.save();

        return res.status(200).json({message:"User UnBlocked SuccessFully"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Server Error"})
        
    }
}


 
export {adminLogin,
    getStudentDetails,
    getTutorDetails,
    getAllCategory,
    blockStudent,
    unblockStudent,
    }