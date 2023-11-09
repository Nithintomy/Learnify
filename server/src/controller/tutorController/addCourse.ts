import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import courseModel from "../../model/Courses";




//add courses


const addCourses =asyncHandler(async(req:Request,res:Response)=>{
    console.log("I m adding course")

    try {
        const {courseName,courseduration,coursedescription,photo,courseFee,tutor,category} =req.body;
        console.log(req.body,"Body data")

    const course = await courseModel.create({
        courseName,
        courseduration,
        coursedescription,
        photo,
        courseFee,
        tutor,
        category
  
    })
  await course.save()


    console.log(course,"Course")

    if(course){
        res.status(200).json({
            courseName,
            courseduration,
            coursedescription,
            photo,
            courseFee,
            tutor
        })
        console.log("sending req to frnd")
    }else{
        res.status(400).json({message:"Invalid Data Entry"})
    }

    } catch (error) {
          console.log(error)
        res.status(500).json({message:"Internal Server Error"})
        
    }

})


//get all courses 


const getCourses =asyncHandler(async(req:Request,res:Response)=>{

    try {
        const { id } = req.params;

        console.log(id)

        const AllCourses = await courseModel.find({tutor:id}).populate('tutor').populate('courseName').populate('category')

        console.log("Get All Courses 1",AllCourses)

        if(AllCourses){
            res.status(200).json({AllCourses})
        }
        
    } catch (error) {
        res.status(500) //internal server error
        throw error;
        
    }

})

const getCourseById =asyncHandler(async(req:Request,res:Response)=>{

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

})

// update Course Data
const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId,"courseId")
    const updatedCourseData = req.body; 
    console.log(updatedCourseData,"updated data")

    // Find the course by its ID and update it
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      updatedCourseData,
      { new: true }
    );

    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const courseCount =async(req:Request,res:Response)=>{

  try {
    const tutorId = req.params.tutorId;

    const courseCount = await courseModel.countDocuments({ tutor: tutorId });

    res.json(courseCount );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}


export {addCourses,getCourses,getCourseById,updateCourse,courseCount}