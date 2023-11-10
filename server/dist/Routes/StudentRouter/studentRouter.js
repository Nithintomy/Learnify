"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../../controller/StudentController/studentController");
const AllCourses_1 = require("../../controller/StudentController/AllCourses");
const AllLessons_1 = require("../../controller/StudentController/AllLessons");
const Cart_1 = require("../../controller/StudentController/Cart");
const studentRouter = express_1.default.Router();
// student SignUp
studentRouter.post('/register', studentController_1.studentSignUp);
//student Login
studentRouter.post('/login', studentController_1.studentLogin);
//resend otp to email
studentRouter.post('/resend_otp', studentController_1.resend_otp);
//student signup with otp
studentRouter.post('/signup_verify', studentController_1.verify_otp);
// forgot-password
studentRouter.post('/forgot-password', studentController_1.sendPasswordLink);
//reset-password
studentRouter.post('/reset-password/:id/:token', studentController_1.ResetPassword);
//student logout
studentRouter.post('/logout', studentController_1.studentLogout);
//google Sign in
studentRouter.post('/googleSignIn', studentController_1.GoogleSignin);
//google SignUp
studentRouter.post('/googleSignUp', studentController_1.GoogleSignUp);
//get All Tutors
studentRouter.get('/allTutors', studentController_1.Tutors);
//get tutors byId
studentRouter.get('/tutor/:tutorId', studentController_1.getTutorsById);
//student Profile
studentRouter.put('/studentProfile/:id', studentController_1.studentProfile);
studentRouter.put('/updateProfile/:id', studentController_1.updateProfile);
//get All Courses
studentRouter.get('/allCourses', AllCourses_1.allCourses);
//get all course By id
studentRouter.get('/getCourse/:courseId', AllCourses_1.getCourseById);
//get All Lesson
studentRouter.get('/allLessons/:courseId', AllLessons_1.allLessons);
//get Entrolled Courses :
studentRouter.get('/entrolled-courses/:id', AllCourses_1.enrolledCourses);
studentRouter.post('/ratings', AllCourses_1.ratings);
studentRouter.get('/ratings/:courseId', AllCourses_1.getRatings);
// cart Management
studentRouter.post('/add-to-cart', Cart_1.addToCart);
studentRouter.delete('/remove-from-cart/:cartItemId', Cart_1.RemoveFromCart);
studentRouter.get('/get-cart-items/:userId', Cart_1.getItemsCart);
studentRouter.get('/check-enrollment/:userId/:courseId', AllCourses_1.checkEnrollmentStatus);
exports.default = studentRouter;
