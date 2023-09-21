import { Request,Response } from "express"
import categoryModel from "../../model/categoryModel";

//add category

const addCategory =async(req:Request,res:Response)=>{

    try {

        const {title,description} =req.body;

        const categoryExist = await categoryModel.findOne({title})

        if(categoryExist){
            res.status(400).json({message:'category Already Exist'})
        }

        const category =await categoryModel.create({
            title,
            description
            
        })

        if(category){
            res.status(200).json({
                title,
                description
            })
        }else{
            res.status(400).json({message:"Invalid Instructor data"})
        }
        
    } catch (error) {
        res.status(500);
        throw error
        
    }

}

const getAllCategory =async(req:Request,res:Response)=>{

    try {
        const CourseDetails =await categoryModel.find().exec()

        if(CourseDetails){
            res.status(200).json({
                CourseDetails
            })
        }else{
            return res.status(400).json({
                message:"No course Found"
            })
        }
        
    } catch (error) {

        console.log(error)
        
    }
}

export {addCategory,getAllCategory}