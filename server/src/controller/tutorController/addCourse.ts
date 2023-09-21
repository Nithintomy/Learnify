import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import courseModel from "../../model/Courses";




//add courses


const addCourses =asyncHandler(async(req:Request,res:Response)=>{
    console.log("I m adding course")

    try {
        const {courseName,courseduration,coursedescription,photo,courseFee,tutor} =req.body;
        console.log(req.body,"Body data")

    const course = await courseModel.create({
        courseName,
        courseduration,
        coursedescription,
        photo,
        courseFee,
        tutor
  
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

export {addCourses,getCourses}