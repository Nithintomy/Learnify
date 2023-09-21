import asyncHandler from 'express-async-handler'
import lessonModel from "../../model/lesson"
import { Request,Response } from 'express'

    const addLesson =asyncHandler(async(req:Request,res:Response)=>{
        const {courseName,title,description,duration,category,video,tutorName} =req.body

        const Lesson =await lessonModel.create({
            courseName,
            title,
            description,
            duration,
            category,
            video,
            tutorName

        })

        if(Lesson){
            res.status(200).json({
                courseName,
                title,
                description,
                duration,
                category,
                video,
                tutorName

            })
        }
       

    })


    //get All lesson

    const getLesson =asyncHandler(async(req:Request,res:Response)=>{
        try {

            const AllLeasons = await lessonModel.find().populate('tutorName').populate('courseName').populate('category')

            if(AllLeasons){
                res.status(200).json({
                    AllLeasons
                })
            }
            
        } catch (error) {
            
        }

    })


    export {addLesson,getLesson}