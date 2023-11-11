import { Request,Response, Router, response } from "express"
import CartItemModel from "../../model/cartModel"


export const addToCart =async(req:Request,res:Response)=>{

  console.log("cart entry")
    
    try {

        const {courseId,userId,quantity} = req.body   

        const existingCartItem =await CartItemModel.findOne({user:userId,course:courseId})

        if(existingCartItem){
            res.status(400).json({message:"Course already in the cart"})
        }else{
            const newCartItem = new CartItemModel({
                user:userId,
                course:courseId,
                quantity 
            });
            await newCartItem.save();
            res.status(200).json({message:"Course Added Successfully"})
        }
        
    } catch (error) {

        console.error("Error Occur while Adding to cart",error)
        res.status(500).json({error:"Internal Server Error"})
        
    }
    


}

 
export const RemoveFromCart =async(req:Request,res:Response)=>{

    const cartItemId = req.params.cartItemId

    try {
        await CartItemModel.findByIdAndRemove(cartItemId)
        res.status(200).json({message:"Course Removed from the cart"})

    } catch (error) {
        console.error("Error Removing Course From cart",error)
        res.status(500).json({error:"Internal Server Error"})
        
    }

}

export const getItemsCart =async(req:Request,res:Response)=>{

    console.log("oiiiii")

    const userId = req.params.userId;

    console.log("userid vannu",userId)

    try {

        const cartItems = await CartItemModel.find({user:userId}).populate('course')

        console.log(cartItems,"items")

        res.status(200).json(cartItems)
        
    } catch (error) {

        console.error("Error fetching cart Items",error)
        res.status(500).json({error:"Internal server Error"})
        
    }


}