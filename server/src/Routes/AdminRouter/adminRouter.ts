import express from 'express'

const adminRouter = express.Router()

import {adminLogin, blockStudent, getStudentDetails, getTutorDetails, unblockStudent} from '../../controller/AdminController/adminController'

//admin Login
adminRouter.post('/adminLogin',adminLogin)

//get All students
adminRouter.get('/getAllStudents',getStudentDetails)

//get Tutor
adminRouter.get('/getAllTutor',getTutorDetails)

//user block 
adminRouter.put('/blockStudents:/id',blockStudent)

//user Unblock
adminRouter.put('/unBlockStudents:/id',unblockStudent)


export default adminRouter;