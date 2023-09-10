import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import courseModel from "../../model/Courses";




//add courses


const addCourses =asyncHandler(async(req:Request,res:Response)=>{

    try {
        const {courseName,courseduration,coursedescription,category,tutor} =req.body;

    const course = await courseModel.create({
        courseName,
        courseduration,
        coursedescription,
        category,
        tutor

    })

    if(course){
        res.status(200).json({
            courseName,
            courseduration,
            coursedescription,
            category,
            tutor
        })
    }else{
        res.status(400).json({message:"Invalid Data Entry"})
    }

        
    } catch (error) {

        res.status(400).json({message:"Invalid Data Entry"})
        
    }

})


//get all courses 


const getCourses =asyncHandler(async(req:Request,res:Response)=>{

    try {

        const AllCourses = await courseModel.find().populate('tutorName').populate('courseName').populate('category')

        console.log("All Courses found",AllCourses)

        if(AllCourses){
            res.status(200).json({AllCourses})
        }
        
    } catch (error) {
        res.status(500) //internal server error
        throw error;
        
    }

})

export {addCourses,getCourses}