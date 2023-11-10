"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCount = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.addCourses = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Courses_1 = __importDefault(require("../../model/Courses"));
//add courses
const addCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I m adding course");
    try {
        const { courseName, courseduration, coursedescription, photo, courseFee, tutor, category } = req.body;
        console.log(req.body, "Body data");
        const course = yield Courses_1.default.create({
            courseName,
            courseduration,
            coursedescription,
            photo,
            courseFee,
            tutor,
            category
        });
        yield course.save();
        console.log(course, "Course");
        if (course) {
            res.status(200).json({
                courseName,
                courseduration,
                coursedescription,
                photo,
                courseFee,
                tutor
            });
            console.log("sending req to frnd");
        }
        else {
            res.status(400).json({ message: "Invalid Data Entry" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addCourses = addCourses;
//get all courses 
const getCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const AllCourses = yield Courses_1.default.find({ tutor: id }).populate('tutor').populate('courseName').populate('category');
        console.log("Get All Courses 1", AllCourses);
        if (AllCourses) {
            res.status(200).json({ AllCourses });
        }
    }
    catch (error) {
        res.status(500); //internal server error
        throw error;
    }
}));
exports.getCourses = getCourses;
const getCourseById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params, "params");
    try {
        const { courseId } = req.params;
        console.log(courseId);
        const course = yield Courses_1.default.findById(courseId).populate('tutor');
        console.log("Course Details", course);
        if (course) {
            res.status(200).json(course);
        }
    }
    catch (error) {
        res.status(500); //internal server error
        throw error;
    }
}));
exports.getCourseById = getCourseById;
// update Course Data
const updateCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        console.log(courseId, "courseId");
        const updatedCourseData = req.body;
        console.log(updatedCourseData, "updated data");
        // Find the course by its ID and update it
        const course = yield Courses_1.default.findByIdAndUpdate(courseId, updatedCourseData, { new: true });
        if (course) {
            res.status(200).json(course);
        }
        else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.updateCourse = updateCourse;
const courseCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.tutorId;
        const courseCount = yield Courses_1.default.countDocuments({ tutor: tutorId });
        res.json(courseCount);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.courseCount = courseCount;
