import express from 'express'

const adminRouter = express.Router()

import {adminLogin, blockStudent, getStudentDetails, getTutorDetails, unblockStudent} from '../../controller/AdminController/adminController'
import { addCategory, getAllCategory } from '../../controller/tutorController/addCategory'
import {AdminapproveCourse,AdminUnApprovedCourse,getCourses} from '../../controller/AdminController/adminAddCourses'
import { OrderView } from '../../controller/AdminController/adminOrderController'
import { TotalSales, totalGraph } from '../../controller/AdminController/adminDashboard'

//admin Login
adminRouter.post('/adminLogin',adminLogin)

//get All students
adminRouter.get('/getAllStudents',getStudentDetails)

//get Tutor
adminRouter.get('/getAllTutor',getTutorDetails)

//user block 
adminRouter.put('/blockStudents/:id',blockStudent)

//add category

adminRouter.post('/addCategory',addCategory)

//get Category 

adminRouter.get('/getallcategory',getAllCategory)

//user Unblock
adminRouter.put('/unBlockStudents/:id',unblockStudent)

//get All Courses
adminRouter.get('/AllCourses',getCourses)

//approve course
adminRouter.put('/approvedCourse/:id', AdminapproveCourse);

//unapproved Course
adminRouter.put('/unapprovedCourse/:id',AdminUnApprovedCourse)


//viewOrders
adminRouter.get('/orderView',OrderView)


//Dashboard

adminRouter.get('/total_count',TotalSales)

adminRouter.get('/sales_report',totalGraph)
export default adminRouter;