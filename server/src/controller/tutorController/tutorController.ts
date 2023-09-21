import { Request,Response } from "express";
import TutorModel from "../../model/tutorModel";
import generateToken from "../../Utils/generateToken";
//student register 

const tutorRegister = async(req:Request,res:Response)=>{

    try {
      const {tutorName,tutorEmail,password,phone,}=req.body;
      console.log(req.body)

      const tutorExist =await TutorModel.findOne({tutorEmail})
      
      const phoneExist =await TutorModel.findOne({phone})

      if(tutorExist || phoneExist){
          console.log(tutorExist,"bna dsb")
        return res.status(400).json({message:"User Already Exist"})
      }
      const tutor = await TutorModel.create({
          tutorName,
          tutorEmail,
          password,
          phone
          
        })
        console.log(tutor,"bdfnb sdn")
 
      if(tutor){

        return res.status(200).json({
            message:'Tutor Registered Successfully',
            _id :tutor._id,
            tutorName:tutor.tutorName,
            Email:tutor.tutorEmail,
            phone:tutor.phone,
          
        })

      }else{ 
        return res.status(400).json({message:"Invalid Tutor Details"})
      }

        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }

}


//student login

const tutorLogin =async(req:Request,res:Response)=>{
    const {tutorEmail,password}=req.body
  
    try {
       
        const tutor = await TutorModel.findOneAndUpdate(
        {tutorEmail},
        {isOnline:true},
        {new:true}
        )
       console.log(tutor,"I am tutor")

       if(!tutor){
            console.log("hello")
            return res.status(400).json({message:"No Tutor Found"})

        }

        if(tutor && (await tutor.matchPassword(password))){
            console.log(tutor,"mnsdfmb sdnb sdvns d")
            //generate a jwt

            const token = generateToken(tutor._id)
            console.log(token)
   
           return res.status(200).json({
                _id:tutor._id,
                name:tutor.tutorName,
                email:tutor.tutorEmail,
                phone:tutor.phone,
                token
            })
          
        }else{
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        
    } catch (error) {
      return  res.status(500).json({
            message:"Internal Server Error "
        })
        
    }
}


const tutorLogout =async(req:Request,res:Response)=>{

    try {
        const tutorid =req.params.id;


        const tutor =await TutorModel.findById({_id:tutorid},{isOnline:false},{new:true}) 

        if(!tutor){
            res.status(404).json({message:"Tutor Not Found"})
        }

        return res.status(200).json({message:"Tutor Logged Out Successfully"})        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
     
    }


}

export {tutorRegister,tutorLogin,tutorLogout}