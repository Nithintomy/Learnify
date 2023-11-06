import express from 'express'
import {studentLogin,studentSignUp,resend_otp,verify_otp,studentLogout,sendPasswordLink,ResetPassword,GoogleSignin,studentProfile,updateProfile,Tutors, GoogleSignUp} from '../../controller/StudentController/studentController'
import { allCourses,getCourseById,enrolledCourses,ratings,getRatings,checkEnrollmentStatus } from '../../controller/StudentController/AllCourses';
import { allLessons } from '../../controller/StudentController/AllLessons';
import { addToCart,RemoveFromCart,getItemsCart } from '../../controller/StudentController/Cart';
import verifyToken from '../../middleware/VerifyToken';

const studentRouter =express.Router();

// student SignUp
studentRouter.post('/register',studentSignUp)

//student Login
studentRouter.post('/login',studentLogin)
 

//resend otp to email
studentRouter.post('/resend_otp',resend_otp)

//student signup with otp
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

//get all course By id
studentRouter.get('/getCourse/:courseId',getCourseById);


//get All Lesson
studentRouter.get('/allLessons/:courseId',allLessons)


//get Entrolled Courses :
studentRouter.get('/entrolled-courses/:id',enrolledCourses)


studentRouter.post('/ratings',ratings)

studentRouter.get('/ratings/:courseId',getRatings)

// cart Management
studentRouter.post('/add-to-cart',addToCart)

studentRouter.delete('/remove-from-cart/:cartItemId',RemoveFromCart)

studentRouter.get('/get-cart-items/:userId',getItemsCart)

studentRouter.get('/check-enrollment/:userId/:courseId', checkEnrollmentStatus);





export default studentRouter;