import courseModel from "../../model/Courses"
import { Request,Response } from "express"

const allCourses = async(req:Request,res:Response)=>{

    console.log("Hai")
    try {

        const allcourse = await courseModel.find().where({isApproved:true})
console.log(allcourse,"kkkkkkkkkkkk")
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

 const getCourseById =async(req:Request,res:Response)=>{
   

        console.log( req.params,"params")
      
        try {
            const { courseId } = req.params;
      
            console.log(courseId)
      
      
            const course = await courseModel.findById(courseId).populate('tutor');
           
      
            console.log("Course Details",course)
      
            if(course){
              res.status(200).json(course);
            }
            
        } catch (error) {
            res.status(500) //internal server error
            throw error;
            
        }



 }

export {allCourses,getCourseById}