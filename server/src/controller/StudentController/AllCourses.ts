import courseModel from "../../model/Courses"
import { Request,Response } from "express"

const allCourses = async(req:Request,res:Response)=>{

    try {

        const allcourse = await courseModel.find().where({isApproved:true})

        if(allcourse){
            res.status(200).json({allcourse})
        }else{
            res.status(401).json({message:"not Valid"})
        }
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
       
    }

 }

export {allCourses}