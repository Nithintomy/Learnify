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
exports.getTutor = exports.getLesson = exports.addLesson = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lesson_1 = __importDefault(require("../../model/lesson"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const addLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, title, description, duration, category, video, tutor } = req.body;
    console.log(courseName, "hi");
    console.log("?hello lesson");
    const Course = yield lesson_1.default.create({
        courseId: courseName,
        title,
        description,
        duration,
        categoryId: category,
        video,
        tutor,
    });
    console.log(Course, "jsnmdbjhashjnbs");
    if (Course) {
        res.status(200).json({
            courseName,
            title,
            description,
            duration,
            categoryId: category,
            video,
            tutorId: tutor,
        });
    }
}));
exports.addLesson = addLesson;
//get All lesson
const getLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const lessons = yield lesson_1.default.find({ courseId });
        if (lessons) {
            res.status(200).json(lessons);
        }
        else {
            res.status(404).json({ message: "Lessons not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.getLesson = getLesson;
const getTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = yield tutorModel_1.default.find().exec();
        if (tutor) {
            res.status(200).json({
                tutor,
            });
        }
    }
    catch (error) {
        res.status(500);
        throw error;
    }
});
exports.getTutor = getTutor;
