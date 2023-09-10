import { Request,Response } from "express"
import studentModel from "../../model/userModel"
import TutorModel from "../../model/tutorModel"



//admin Login
const adminLogin =async(req: Request,res:Response)=>{
    
    try {
        const adminEmail = "nithintomy2255@gmail.com"
        const adminpassword = "12345"
        const {email,password} =req.body
        console.log(req.body,"admin")

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
        const TutorDetails =await TutorModel.find().exec()

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

//block student
const blockStudent =()=>{
    try {
        
    } catch (error) {
        
    }
}

//unblock student 
const unblockStudent =()=>{
    try {
        
    } catch (error) {
        
    }
}

export {adminLogin,
    getStudentDetails,
    getTutorDetails,
    blockStudent,
    unblockStudent}