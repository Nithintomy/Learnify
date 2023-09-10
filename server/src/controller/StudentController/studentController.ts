import { Request,Response } from "express";
import studentModel from "../../model/userModel";
import generateToken from "../../Utils/generateToken";

const studentSignUp =async(req:Request,res:Response)=>{
    try {
        const {studentName,studentEmail,password,phone} = req.body;
        console.log(req.body)

    if( !studentName || !studentEmail || !password|| !phone){
       return res.status(400).json({message:"All Field Required"})
    }

    const userExist = await studentModel.findOne({studentEmail})
    console.log(userExist,"I am exist")
    const userphone = await studentModel.findOne({phone})

    if(userExist ){
        return res.status(400).json({
            message:"User Email Already Exist"
        })
    }else if(userphone){
        return res.status(400).json({
            message:"Phone Number Already Exist"
        })
    }

    const user =await studentModel.create({
        studentName,
        studentEmail,
        password,
        phone
    })

    if(user){
        return res.status(201).json({
            _id:user._id,
            name:user.studentName,
            email:user.studentEmail,
            phone:user.phone,
         
        })
    }else{
        return res.status(400).json({message:"Invalid UserData"})
    }

    } catch (error: any) {
      
          console.log(error);
          res.status(500).json({ message: "Server Error" });
        
      }

}

const studentLogin =async(req:Request,res:Response)=>{
    try {
        const {studentEmail,password} =req.body;
        console.log(req.body)

        const user =await studentModel.findOne({studentEmail})

        if(!user){
            return res.status(401).json({message:"Invalid user "})
        }
        if(user?.isBlocked===true){
            return res.status(401).json({message:"User is Blocked"})

        }

        if(user &&await user.matchPassword(password)){
            //generate Token
          const token = generateToken(user._id)

          return res.json({
            _id:user._id,
            name:user.studentName,
            email:user.studentEmail,
            phone:user.phone,
            isBlocked:user.isBlocked,
            token

          })

        }else{
            return  res.status(401).json({message:"Invalid Email and Password"})

        }
        
    } catch (error) {
        res.status(500).json({message:"server Error "})
        
    }
}

const studentLogout =async(req:Request,res:Response)=>{
    try {
        const userId =req.params.id;
        const user = await studentModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }else{
            await user.save();
            res.status(200).json({message:"user Logout Successfully"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }

 }

 const GoogleSignin = async (req:Request, res:Response) => {
    try {
      const { name, email } = req.body;
  
      // Check if the user with the given email exists in your system
      const user = await studentModel.findOne({ studentEmail: email });
  
      if (!user) {
        return res.json({ success: false, message: "User does not exist" });
      } else {
        if (user.isBlocked) {
          return res.json({ message: "User is blocked" });
        }
  
        // Generate a token for the user (you can use your own token generation logic)
        const token = generateToken(user._id);
  
        return res.json({
          user,
          token,
          message: "User login successful",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Internal server error");
    }
  };


export {studentLogin,studentSignUp,GoogleSignin,studentLogout}