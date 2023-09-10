import express from 'express'
import { tutorLogin, tutorRegister } from '../../controller/tutorController/tutorController';
import { addCourses,getCourses } from '../../controller/tutorController/addCourse';
import { addCategory } from '../../controller/tutorController/addCategory';
import { addLesson } from '../../controller/tutorController/addLesson';

const tutorRouter = express.Router();

//tutor Signup
tutorRouter.post('/register',tutorRegister)

//tutor Login
tutorRouter.post('/login',tutorLogin)

//tutor addCategory
tutorRouter.post('/addCategory',addCategory)

//tutor addCourses
tutorRouter.post('/addCourses',addCourses)

//tutor can view Courses
tutorRouter.get('/courses',getCourses)

//tutor can add Lessons
tutorRouter.post('/addLessons',addLesson)

// tutor can a get Lessons

export default tutorRouter;