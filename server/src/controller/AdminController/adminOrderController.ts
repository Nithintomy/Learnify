
import { Request,Response } from "express"
import orderModel from "../../model/orderModel"

const OrderView = async (req:Request,res:Response)=>{

    try {
        const order = await orderModel.find().populate('studentId').populate('courseId').populate('tutorId')

        if(order){
            res.status(200).json({order})
        }else{
            res.status(400).json({message:"No order Found"})
        }
        
    } catch (error) {
        console.log(error)
        
    }

}


export {OrderView}