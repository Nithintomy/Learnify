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
exports.checkEnrollmentStatus = exports.getRatings = exports.ratings = exports.enrolledCourses = exports.getCourseById = exports.allCourses = void 0;
const Courses_1 = __importDefault(require("../../model/Courses"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const RatingModel_1 = __importDefault(require("../../model/RatingModel"));
const allCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hai");
    try {
        const allcourse = yield Courses_1.default.find().where({ isApproved: true }).populate("category");
        console.log(allcourse, "kkkkkkkkkkkk");
        if (allcourse) {
            res.status(200).json({ allcourse });
        }
        else {
            res.status(401).json({ message: "not Valid" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.allCourses = allCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params, "params");
    try {
        const { courseId } = req.params;
        console.log(courseId);
        const course = yield Courses_1.default.findById(courseId).populate('tutor').populate('category');
        console.log("Course Details", course);
        if (course) {
            res.status(200).json(course);
        }
    }
    catch (error) {
        res.status(500); //internal server error
        throw error;
    }
});
exports.getCourseById = getCourseById;
const enrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enrolled courses");
    const id = req.params.id;
    console.log(id, "id ondonnu okkku");
    try {
        const enrolledCourses = yield orderModel_1.default
            .find({ studentId: id })
            .populate("studentId")
            .populate("courseId")
            .populate("tutorId");
        console.log(enrolledCourses, "enrolled courses");
        res.status(200).json(enrolledCourses);
    }
    catch (error) {
        console.log("error While Fetching EnrolledCourses", error);
        res.status(500).json({ error: "internal Server Error" });
    }
});
exports.enrolledCourses = enrolledCourses;
const ratings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello rating anney");
    try {
        const { rating, comment, user, course } = req.body;
        const existRating = yield RatingModel_1.default.findOne({ user, course });
        if (existRating) {
            return res.status(400).json("You can only Leave one comment for this course");
        }
        console.log(req.body, "body ondey");
        const newRating = new RatingModel_1.default({
            rating,
            comment,
            user,
            course
        });
        yield newRating.save();
        res.status(201).json(newRating);
    }
    catch (error) {
        console.error("Error submitting rating:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.ratings = ratings;
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const ratings = yield RatingModel_1.default.find({ course: courseId }).populate("user");
        res.status(200).json(ratings);
    }
    catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getRatings = getRatings;
const checkEnrollmentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId } = req.params;
    try {
        const isEnrolled = yield orderModel_1.default.exists({
            studentId: userId,
            courseId: courseId,
        });
        res.status(200).json({ isEnrolled });
    }
    catch (error) {
        console.error("Error checking enrollment status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.checkEnrollmentStatus = checkEnrollmentStatus;
