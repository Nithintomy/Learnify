import { Request,Response, response } from "express";
import TutorModel from "../../model/tutorModel";
import generateToken from "../../Utils/generateToken";
import studentModel from "../../model/userModel";
import courseModel from "../../model/Courses";
import orderModel from "../../model/orderModel";
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

const updateTutorProfile =async(req:Request,res:Response)=>{

    try {
        const tutorId = req.params.id;
        const { tutorName, tutorEmail, phone} = req.body;
    
    
        const tutor = await TutorModel.findById(tutorId);
    
        if (!tutor) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        tutor.tutorName = tutorName;
        tutor.tutorEmail = tutorEmail;
        tutor.phone = phone;
    
        await tutor.save();

        console.log(tutor,"tooooooooooooooooter")
    
        return res.status(200).json({ message: 'Profile updated successfully', tutor });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
    }

const TutorProfile = async (req: Request, res: Response) => { 
    console.log("hhhhhhhhhhhhhhhhh")
    const { image } = req.body;
    const tutorId = req.params.id.trim();
    console.log(tutorId,"ndbsDJFewfe")
    try {
      const tutor = await TutorModel.findById({_id:tutorId});
      console.log(tutor, "user");
  
      if (!tutor) {
        return res.status(404).json({ message: "User not found" });
      }
  
      tutor.photo = image;
  
      await tutor.save();
  console.log(tutor,"tu")
      return res.status(200).json({ message: "Profile picture updated", tutor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const getStudentDetails = async (req:Request,res:Response)=>{
    try {
      const studentData =await studentModel.find().exec()
    

      if(studentData){
          res.status(200).json({
            studentData
          })
      }else{
          return res.status(400).json({
              message:"no users Found"
          })

      }
  } catch (error) {
      console.log(error)
  }


  }

  const getStudentByCourses = async (req: Request, res: Response) => {
    const { tutorId } = req.params;
    try {
      
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch students" });
    }
  }

  
  



export {tutorRegister,tutorLogin,tutorLogout,TutorProfile,updateTutorProfile,getStudentDetails,getStudentByCourses}