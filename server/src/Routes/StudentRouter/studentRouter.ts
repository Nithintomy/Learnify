import express from 'express'
import {studentLogin,studentSignUp,studentLogout} from '../../controller/StudentController/studentController'

const studentRouter =express.Router();

studentRouter.post('/register',studentSignUp)

studentRouter.post('/login',studentLogin)


studentRouter.post('/logout',studentLogout)

export default studentRouter;