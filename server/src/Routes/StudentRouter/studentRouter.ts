import express from 'express'
import {studentLogin,studentSignUp,verify_otp,studentLogout,sendPasswordLink,ResetPassword,GoogleSignin,studentProfile,updateProfile,Tutors, GoogleSignUp} from '../../controller/StudentController/studentController'
import { allCourses,getCourseById } from '../../controller/StudentController/AllCourses';
import { allLessons } from '../../controller/StudentController/AllLessons';
import verifyToken from '../../middleware/VerifyToken';

const studentRouter =express.Router();

// student SignUp
studentRouter.post('/register',studentSignUp)

//student Login
studentRouter.post('/login',studentLogin)

//student login with otp
studentRouter.post('/signup_verify',verify_otp)

// forgot-password
studentRouter.post('/forgot-password',sendPasswordLink)

//reset-password
studentRouter.post('/reset-password/:id/:token',ResetPassword)

//student logout
studentRouter.post('/logout',studentLogout)

//google Sign in
studentRouter.post('/googleSignIn',GoogleSignin)

//google SignUp
studentRouter.post('/googleSignUp',GoogleSignUp)

//get All Tutors
studentRouter.get('/allTutors',Tutors)

//student Profile
studentRouter.put('/studentProfile/:id',studentProfile)

studentRouter.put('/updateProfile/:id',updateProfile)


//get All Courses
studentRouter.get('/allCourses',allCourses)

studentRouter.get('/getCourse/:courseId',getCourseById);


//get All Lesson
studentRouter.get('/allLessons',allLessons)






export default studentRouter;