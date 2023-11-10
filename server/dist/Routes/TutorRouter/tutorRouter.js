"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorController_1 = require("../../controller/tutorController/tutorController");
const addCourse_1 = require("../../controller/tutorController/addCourse");
const addCategory_1 = require("../../controller/tutorController/addCategory");
const addLesson_1 = require("../../controller/tutorController/addLesson");
const tutorRouter = express_1.default.Router();
//tutor Signup
tutorRouter.post('/register', tutorController_1.tutorRegister);
//tutor Login
tutorRouter.post('/login', tutorController_1.tutorLogin);
//tutor Logout
tutorRouter.put('/logout', tutorController_1.tutorLogout);
//tutor addCategory
tutorRouter.post('/addCategory', addCategory_1.addCategory);
//tutor getAll students 
tutorRouter.get('/getAllStudents', tutorController_1.getStudentDetails);
//get students of specific tutor
tutorRouter.get('/tutor/:tutorId', tutorController_1.getStudentByCourses);
//tutor getCategory
tutorRouter.get('/Allcategory', addCategory_1.getAllCategory);
//tutor addCourses
tutorRouter.post('/addCourse', addCourse_1.addCourses);
//tutor can view Courses
tutorRouter.get('/courses/:id', addCourse_1.getCourses);
//tutor can add Lessons
tutorRouter.post('/addLessons', addLesson_1.addLesson);
// tutor can a get Lessons
tutorRouter.get('/getLessons/:courseId', addLesson_1.getLesson);
tutorRouter.get('/getCourse/:courseId', addCourse_1.getCourseById);
//updating the course 
tutorRouter.put('/updateCourse/:courseId', addCourse_1.updateCourse);
//updating the Tutor Profile 
tutorRouter.put('/tutorProfile/:id', tutorController_1.TutorProfile);
//updating the tutor Details
tutorRouter.put('/updateTutorProfile/:id', tutorController_1.updateTutorProfile);
//course count of specific users 
tutorRouter.get('/tutor/:tutorId/courseCount', addCourse_1.courseCount);
exports.default = tutorRouter;
