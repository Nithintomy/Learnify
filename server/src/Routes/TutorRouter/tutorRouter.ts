import express from 'express'
import { tutorLogin, tutorLogout, tutorRegister } from '../../controller/tutorController/tutorController';
import { addCourses,getCourses } from '../../controller/tutorController/addCourse';
import { addCategory, getAllCategory } from '../../controller/tutorController/addCategory';
import { addLesson } from '../../controller/tutorController/addLesson';

const tutorRouter = express.Router();

//tutor Signup
tutorRouter.post('/register',tutorRegister)

//tutor Login
tutorRouter.post('/login',tutorLogin)

//tutor Logout
tutorRouter.put('/logout',tutorLogout)

//tutor addCategory
tutorRouter.post('/addCategory',addCategory)

//tutor getCategory

tutorRouter.get('/Allcategory',getAllCategory)

//tutor addCourses
tutorRouter.post('/addCourse',addCourses)

//tutor can view Courses
tutorRouter.get('/courses/:id',getCourses)

//tutor can add Lessons
tutorRouter.post('/addLessons',addLesson) 

// tutor can a get Lessons

export default tutorRouter;