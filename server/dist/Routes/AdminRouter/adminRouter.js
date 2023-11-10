"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
const adminController_1 = require("../../controller/AdminController/adminController");
const addCategory_1 = require("../../controller/tutorController/addCategory");
const adminAddCourses_1 = require("../../controller/AdminController/adminAddCourses");
const adminOrderController_1 = require("../../controller/AdminController/adminOrderController");
const adminDashboard_1 = require("../../controller/AdminController/adminDashboard");
//admin Login
adminRouter.post('/adminLogin', adminController_1.adminLogin);
//get All students
adminRouter.get('/getAllStudents', adminController_1.getStudentDetails);
//get Tutor
adminRouter.get('/getAllTutor', adminController_1.getTutorDetails);
//user block 
adminRouter.put('/blockStudents/:id', adminController_1.blockStudent);
//add category
adminRouter.post('/addCategory', addCategory_1.addCategory);
//get Category 
adminRouter.get('/getallcategory', addCategory_1.getAllCategory);
//user Unblock
adminRouter.put('/unBlockStudents/:id', adminController_1.unblockStudent);
//get All Courses
adminRouter.get('/AllCourses', adminAddCourses_1.getCourses);
//approve course
adminRouter.put('/approvedCourse/:id', adminAddCourses_1.AdminapproveCourse);
//unapproved Course
adminRouter.put('/unapprovedCourse/:id', adminAddCourses_1.AdminUnApprovedCourse);
//viewOrders
adminRouter.get('/orderView', adminOrderController_1.OrderView);
//Dashboard
adminRouter.get('/total_count', adminDashboard_1.TotalSales);
adminRouter.get('/sales_report', adminDashboard_1.totalGraph);
exports.default = adminRouter;
