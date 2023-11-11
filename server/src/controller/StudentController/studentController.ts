import { Request, Response } from "express";
import studentModel from "../../model/userModel";
import generateToken from "../../Utils/generateToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import TutorModel from "../../model/tutorModel";



const globalData = {
  otp: null as null | number, 
  newOtp:null as null | number,
  user: null as null | {
    studentName: string;
    studentEmail: string;
    phone: string;
    password: string;

  }, 


};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithintomy8281@gmail.com",
    pass: "fdhqztoqusjqmclp",
  },
});

//studentSignUp
const studentSignUp = async (req: Request, res: Response) => {
  try {
    const { studentName, studentEmail, password, phone } = req.body;
    console.log(req.body);

    if (!studentName || !studentEmail || !password || !phone) {
      return res.status(400).json({ message: "All Field Required" });
    }

    const userExist = await studentModel.findOne({ studentEmail });
    console.log(userExist, "I am exist");
    const userphone = await studentModel.findOne({ phone });

    if (userExist) {
      return res.status(400).json({
        message: "User Email Already Exist",
      });
    } else if (userphone) {
      return res.status(400).json({
        message: "Phone Number Already Exist",
      });
    }

    const user = {
      studentName,
      studentEmail,
      phone,
      password,
    };

    globalData.user = user;

    // Generate OTP and store it in globalData
    const otp: number = parseInt((Math.random() * 1000000).toString(), 10);
    globalData.otp = otp;

    const mailOptions = {
      from: "nithintomy8281@gmail.com",
      to: studentEmail, // Use studentEmail directly here
      subject: "Sending Email using Node.js",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ message: "Error sending OTP email" });
      } else {
        console.log("OTP email sent successfully:", info.response);
        return res.status(200).json({ message: "OTP sent to your email" });
      }
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};


const resend_otp = async (req: Request, res: Response) => {
  console.log("i am resending")
  try {
    const { studentEmail } = req.body;
    console.log(studentEmail,"email anney")

    // Generate a new OTP
    const newOtp: number = parseInt((Math.random() * 1000000).toString(), 10);
 
    globalData.otp = newOtp;

    const mailOptions = {
      from: "nithintomy8281@gmail.com",
      to: studentEmail,
      subject: "Resending OTP using Node.js",
      html:
        "<h3>New OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        newOtp +
        "</h1>",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ message: "Error sending OTP email" });
      } else {
        console.log("New OTP email sent successfully:", info.response);
        return res.status(200).json({ message: "New OTP sent to your email" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};


//verify Otp


const verify_otp = async (req: Request, res: Response) => {
  console.log("i am here");
  try {
    const { otp } = req.body;
    console.log("otp:", otp);
    console.log("globalData.otp:", globalData.otp);

    if (parseInt(otp, 10) === globalData.otp) {
      console.log("enter if condition");
      const addUser = await studentModel.create(globalData.user);
      const token = generateToken(addUser._id);
      return res.status(200).json({
        _id: addUser?._id,
        name: addUser?.studentName,
        email: addUser?.studentEmail,
        phone: addUser?.phone,
        token,
      });
    } else {
      console.log("else otp case")
      // Return a 400 status code for incorrect OTP
      return res.status(400).json({ message: "Wrong otp" });
    
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};



const studentLogin = async (req: Request, res: Response) => {
  try {
    const { studentEmail, password } = req.body;
    console.log(req.body);

    const user = await studentModel.findOne({ studentEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid user " });
    }
    if (user?.isBlocked === true) {
      return res.status(401).json({ message: "User is Blocked" });
    }

    if (user && (await user.matchPassword(password))) {
      //generate Token
      const token = generateToken(user._id);
      console.log(token);

      return res.json({
        user,
        token
      });
    } else {
      return res.status(401).json({ message: "Invalid Email and Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "server Error " });
  }
};

const GoogleSignUp = async (req: Request, res: Response) => {
  const token = req.body.credential;
  const decode = jwt.decode(token) as JwtPayload | null;
  console.log(decode, "decode");

  let studentEmail: string | undefined;
  let studentName: string | undefined;
  let photo: string | undefined;

  if (decode) {
    const { name, email, picture, jti } = decode;
    studentEmail = email;
    studentName = name;
    photo = picture; // Assign the value to 'picture'

    if (studentName && studentEmail && photo && jti) {
      console.log(name, email, photo, jti);
    } else {
      console.log("jwt payload is missing some properties");
    }
  } else {
    console.log("Token is not valid or Expired");
  }

  try {
    const userExist = await studentModel.findOne({ studentEmail });
    console.log(userExist, "I am exist");

    if (userExist) {
      return res.status(400).json({
        message: "User Email Already Exist",
      });
    }

    const newUser = await studentModel.create({
      studentName: studentName, // Initialize with 'studentName'
      studentEmail: studentEmail,
      photo: photo, // Initialize with 'picture'
    });

    console.log("User saved", newUser);
    res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

//Google SignIn

const GoogleSignin = async (req: Request, res: Response) => {
  console.log("why i am here")
  const token = req.body.credential;
  const decode = jwt.decode(token) as JwtPayload | null;

  let studentEmail: string | undefined;
  if (decode) {
    const { name, email, picture, jti } = decode;
    studentEmail = email;
    if (name && email && picture && jti) {
      console.log(name, email, picture, jti,"work ayo");
    } else {
      console.log("jwt payload is missing some properties");
    }
  } else {
    console.log("Token is not valid or Expired");
  }

  try {
    const user = await studentModel.findOne({ studentEmail });
    console.log(user,"google user");

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    } else {
      if (user.isBlocked) {
        return res.json({ message: "User is blocked" });
      }

      if (user) {
        // Generate a token for the user
        const token = generateToken(user._id);

        user.password = "";

        return res.json({
          user: {
            _id: user._id,
            studentName: user.studentName,
            studentEmail: user.studentEmail,
            phone: user.phone,
            isBlocked: user.isBlocked,
            photo: user.photo,
          },
          token,
          message: "login successfully",
        });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

//send Email Link For Reset Password
const sendPasswordLink = async (req: Request, res: Response) => {
  console.log(req.body, "body");

  const { email } = req.body;
  console.log(email);

  if (!email) {
   return res.status(401).json({ message: "Enter Your Email" });
  }

  try {
    console.log("Hello");

    const user = await studentModel.findOne({ studentEmail: email });

    if (!user) {
      console.log("riiiiii")
      return res.status(400).json({ message: "Email not found in the database" });
    }


    if (user) {
      //generate Token
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "120s",
        }
      );
      console.log(token);

      const setUsertoken = await studentModel.findByIdAndUpdate(
        { _id: user._id },
        { verifyToken: token },
        { new: true }
      );

      // email Config

      

      console.log(setUsertoken, "setUsertoken");

      if (setUsertoken) {
        const mailOptions = {
          from: "nithintomy8281@gmail.com",
          to: email,
          subject: "Sending Email for password Reset",
          text: `This Link Valid For 2 minutes http://localhost:3000/reset-password/${user._id}/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error, "error");
            return res
              .status(403)
              .json({ message: "Something went wrong Email not sent" });
          } else {
            console.log("Email Send", info.response);
            return res.status(201).json({ Status: 'Success', message: 'Password reset successful' });
          }
        });
      }
    } else {
      return res.status(401).json({ Status: 'Error', message: 'Password not updated' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: 'Error', message: 'Internal server error' });
  }
};

//reset Password 

const ResetPassword =async(req:Request,res:Response)=>{

  const {id,token}=req.params;
  const {password}=req.body;

  console.log("Good boy")

  try {
    const user = await studentModel.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.password = password; // Replace 'newPassword' with the actual password
    await user.save();

    console.log(
      "PAssword Change"
    )


    res.status(200).json({ Status: 'Success', message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: 'Error', message: 'Internal server error' });
  }
}





//get All tutors List
const Tutors = async (req: Request, res: Response) => {
  const allTutors = await TutorModel.find().exec();

  res.status(200).json({
    allTutors,
  });
};

const studentProfile = async (req: Request, res: Response) => {
  console.log("hhhhhhhhhhhhhhhhh")
  const { image } = req.body;
  const userId = req.params.id.trim();
  console.log(userId)
  try {
    const user = await studentModel.findById({_id:userId});
    console.log(user, "user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.photo = image;

    await user.save();

    return res.status(200).json({ message: "Profile picture updated", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile =async (req:Request,res:Response)=>{
  try {
    const userId = req.params.id;
    const { studentName, studentEmail, phone} = req.body;


    const user = await studentModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.studentName = studentName;
    user.studentEmail = studentEmail;
    user.phone = phone;
 
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

const studentLogout = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    } else {
      await user.save();
      res.status(200).json({ message: "user Logout Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTutorsById =async (req: Request, res: Response)=>{
  console.log(req.params.tutorId,"id")
  console.log("hiohi")
  try {
    const tutor = await TutorModel.findById(req.params.tutorId);
    console.log(tutor,"gfda")
    res.json(tutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tutor details" });
  }

}

export {
  studentLogin,
  studentSignUp,
  resend_otp,
  verify_otp,
  GoogleSignin,
  GoogleSignUp,
  studentLogout,
  sendPasswordLink,
  ResetPassword,
  studentProfile,
  updateProfile,
  Tutors,
  getTutorsById
};