import { Request,Response } from "express"
import lessonModel from "../../model/lesson"

const allLessons =async(req:Request,res:Response)=>{

    try {

        const lessons = await lessonModel.find()

        if(lessons){
            res.status(201).json({lessons})
        }else{
            res.status(400).json({message:"Not valid"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}


export {allLessons}