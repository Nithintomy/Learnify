import { Request,Response } from "express"
import lessonModel from "../../model/lesson"
import courseModel from "../../model/Courses";

const allLessons =async(req:Request,res:Response)=>{

    console.log("lesson lu keri")


    try {
        const courseId = req.params.courseId;

        console.log(courseId,"courseId match naoo")
    
        const lessons = await lessonModel.find({ courseId });
    
        if (lessons) {
            console.log(lessons,"lesson ondu")
          res.status(200).json(lessons);
        } else {
          res.status(404).json({ message: "Lessons not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }

    }



export {allLessons}