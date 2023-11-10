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
exports.unblockStudent = exports.blockStudent = exports.getAllCategory = exports.getTutorDetails = exports.getStudentDetails = exports.adminLogin = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
//admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enter into itrr");
    try {
        const adminEmail = "nithintomy2255@gmail.com";
        const adminpassword = "12345";
        const { email, password } = req.body;
        if (adminEmail === email && adminpassword === password) {
            return res.status(200).json({
                message: "Login SuccessFully"
            });
        }
        else {
            return res.status(400).json({
                message: "Incorrect Details"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.adminLogin = adminLogin;
// get all students 
const getStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = yield userModel_1.default.find().exec();
        if (studentData) {
            res.status(200).json({
                studentData
            });
        }
        else {
            return res.status(400).json({
                message: "no users Found"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getStudentDetails = getStudentDetails;
//get All tutor details
const getTutorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TutorDetails = yield tutorModel_1.default.find().exec();
        if (TutorDetails) {
            res.status(200).json({
                TutorDetails
            });
        }
        else {
            res.status(400).json({
                message: "No TutorDetails Found"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTutorDetails = getTutorDetails;
//get All Catagories
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryDetails = yield categoryModel_1.default.find().exec();
        if (categoryDetails) {
            console.log("Get all Category");
            res.status(200).json({
                categoryDetails,
            });
        }
        else {
            return res.status(400).json({
                message: "no users in this table",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCategory = getAllCategory;
//block student
const blockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "id");
        const user = yield userModel_1.default.findById(id);
        console.log(user, "user");
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        user.isBlocked = true;
        yield user.save();
        return res.status(200).json({ message: "User Blocked Successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.blockStudent = blockStudent;
//unblock student 
const unblockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        user.isBlocked = false;
        yield user.save();
        return res.status(200).json({ message: "User UnBlocked SuccessFully" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Server Error" });
    }
});
exports.unblockStudent = unblockStudent;
