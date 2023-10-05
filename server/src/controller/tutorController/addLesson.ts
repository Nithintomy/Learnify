import asyncHandler from 'express-async-handler'
import lessonModel from "../../model/lesson"
import { Request,Response } from 'express'
import TutorModel from '../../model/tutorModel'

    const addLesson =asyncHandler(async(req:Request,res:Response)=>{
        const {courseName,title,description,duration,category,video,tutor} =req.body
        console.log(courseName,"hi")
        console.log("?hello lesson")
        const Course =await lessonModel.create({
            courseId:courseName,
            title,
            description,
            duration,
            categoryId:category,
            video,
            tutor

        })

        console.log(Course,"jsnmdbjhashjnbs")

        if(Course){
            res.status(200).json({
                courseName,
                title,
                description,
                duration,
                categoryId:category,
                video,
                tutorId:tutor

            })
        }
       

    })


    //get All lesson

    const getLesson =asyncHandler(async(req:Request,res:Response)=>{
        try {
            const courseId = req.params.courseId;
        
            const lessons = await lessonModel.find({ courseId });
        
            if (lessons) {
              res.status(200).json(lessons);
            } else {
              res.status(404).json({ message: 'Lessons not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        });

    const getTutor =async(req:Request,res:Response)=>{

        try {
            
            const tutor =await TutorModel.find().exec();

            if(tutor){
                res.status(200).json({
                    tutor
                })
            }
        }  catch (error) {
            res.status(500); 
            throw error;

    }
}


    export {addLesson,getLesson,getTutor}