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
exports.getCourses = exports.AdminUnApprovedCourse = exports.AdminapproveCourse = void 0;
const Courses_1 = __importDefault(require("../../model/Courses"));
const AdminapproveCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello i am here");
    try {
        const { id } = req.params;
        const courseApproved = yield Courses_1.default.findByIdAndUpdate(id, { isApproved: true });
        if (!courseApproved) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course approved" });
    }
    catch (error) {
        console.error("Error approving course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.AdminapproveCourse = AdminapproveCourse;
const AdminUnApprovedCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HEllo Betta");
    try {
        const { id } = req.params;
        console.log(req.params, "adjasb");
        const course = yield Courses_1.default.findByIdAndUpdate(id, { isApproved: false });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course unapproved successfully" });
    }
    catch (error) {
        console.error("Error unapproving course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.AdminUnApprovedCourse = AdminUnApprovedCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("geting courses");
    try {
        const AllCourses = yield Courses_1.default.find().populate('tutor').populate('category');
        console.log(AllCourses, "ALl Courses");
        if (AllCourses) {
            res.status(200).json({ AllCourses });
        }
    }
    catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getCourses = getCourses;
