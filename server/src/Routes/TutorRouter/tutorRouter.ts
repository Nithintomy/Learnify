import express from 'express'
import { tutorLogin, tutorLogout, tutorRegister ,TutorProfile,updateTutorProfile,getStudentDetails,getStudentByCourses} from '../../controller/tutorController/tutorController';
import { addCourses,getCourseById,getCourses,updateCourse,courseCount} from '../../controller/tutorController/addCourse';
import { addCategory, getAllCategory } from '../../controller/tutorController/addCategory';
import { addLesson, getLesson } from '../../controller/tutorController/addLesson';

const tutorRouter = express.Router();

//tutor Signup
tutorRouter.post('/register',tutorRegister)

//tutor Login
tutorRouter.post('/login',tutorLogin)

//tutor Logout
tutorRouter.put('/logout',tutorLogout)

//tutor addCategory
tutorRouter.post('/addCategory',addCategory)

//tutor getAll students 
tutorRouter.get('/getAllStudents',getStudentDetails)

//get students of specific tutor

tutorRouter.get('/tutor/:tutorId',getStudentByCourses)

//tutor getCategory
tutorRouter.get('/Allcategory',getAllCategory)

//tutor addCourses
tutorRouter.post('/addCourse',addCourses)

//tutor can view Courses
tutorRouter.get('/courses/:id',getCourses)

//tutor can add Lessons
tutorRouter.post('/addLessons',addLesson) 

// tutor can a get Lessons
tutorRouter.get('/getLessons/:courseId',getLesson)


tutorRouter.get('/getCourse/:courseId',getCourseById);

//updating the course 
tutorRouter.put('/updateCourse/:courseId',updateCourse)

//updating the Tutor Profile 
tutorRouter.put('/tutorProfile/:id',TutorProfile)

//updating the tutor Details
tutorRouter.put('/updateTutorProfile/:id',updateTutorProfile)

//course count of specific users 
tutorRouter.get('/tutor/:tutorId/courseCount',courseCount)


export default tutorRouter; 