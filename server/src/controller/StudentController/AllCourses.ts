import courseModel from "../../model/Courses"
import { Request,Response } from "express"
import orderModel from "../../model/orderModel";
import RatingModel from "../../model/RatingModel";

const allCourses = async(req:Request,res:Response)=>{

    console.log("Hai")
    try {

        const allcourse = await courseModel.find().where({isApproved:true}).populate("category"); 
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
      
      
            const course = await courseModel.findById(courseId).populate('tutor').populate('category');
           
      
            console.log("Course Details",course)
      
            if(course){
              res.status(200).json(course);
            }
            
        } catch (error) {
            res.status(500) //internal server error
            throw error;
            
        }

 }

 const enrolledCourses = async (req: Request, res: Response) => {
    console.log("enrolled courses");

    const id = req.params.id;
    console.log(id, "id ondonnu okkku");

    try {
        const enrolledCourses = await orderModel
            .find({studentId: id })
            .populate("studentId")
            .populate("courseId")
            .populate("tutorId")
     
            

        console.log(enrolledCourses, "enrolled courses");

        res.status(200).json(enrolledCourses );
    } catch (error) {
        console.log("error While Fetching EnrolledCourses", error);
        res.status(500).json({ error: "internal Server Error" });
    }
}

const ratings =async(req:Request,res:Response)=>{
    console.log("Hello rating anney")

    try {

        const {rating,comment,user,course} =req.body


        const existRating = await RatingModel.findOne({user,course})

        if(existRating){
            return res.status(400).json("You can only Leave one comment for this course")
        }

        console.log(req.body,"body ondey")

        const newRating = new RatingModel({
            rating,
            comment,
            user,
            course
        })

        await newRating.save()
        res.status(201).json(newRating) 
        
    } catch (error) {
        console.error("Error submitting rating:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const getRatings =async(req:Request,res:Response)=>{

    try {
        const courseId = req.params.courseId

        const ratings = await RatingModel.find({course:courseId}).populate("user")

        res.status(200).json(ratings)
        
    }  catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    


}

const checkEnrollmentStatus =async(req:Request,res:Response)=>{
    const { userId, courseId } = req.params;
try {
    const isEnrolled = await orderModel.exists({
        studentId: userId,
        courseId: courseId,
      });
      res.status(200).json({ isEnrolled });
      
    
}catch (error) {
    console.error("Error checking enrollment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

export {allCourses,getCourseById,enrolledCourses,ratings,getRatings,checkEnrollmentStatus}