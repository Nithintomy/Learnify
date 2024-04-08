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
exports.getStudentByCourses = exports.getStudentDetails = exports.updateTutorProfile = exports.TutorProfile = exports.tutorLogout = exports.tutorLogin = exports.tutorRegister = void 0;
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const generateToken_1 = __importDefault(require("../../Utils/generateToken"));
const userModel_1 = __importDefault(require("../../model/userModel"));
//student register 
const tutorRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorName, tutorEmail, password, phone, } = req.body;
        console.log(req.body);
        const tutorExist = yield tutorModel_1.default.findOne({ tutorEmail });
        const phoneExist = yield tutorModel_1.default.findOne({ phone });
        if (tutorExist || phoneExist) {
            console.log(tutorExist, "bna dsb");
            return res.status(400).json({ message: "User Already Exist" });
        }
        const tutor = yield tutorModel_1.default.create({
            tutorName,
            tutorEmail,
            password,
            phone
        });
        console.log(tutor, "bdfnb sdn");
        if (tutor) {
            return res.status(200).json({
                message: 'Tutor Registered Successfully',
                _id: tutor._id,
                tutorName: tutor.tutorName,
                Email: tutor.tutorEmail,
                phone: tutor.phone,
            });
        }
        else {
            return res.status(400).json({ message: "Invalid Tutor Details" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.tutorRegister = tutorRegister;
//student login
const tutorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutorEmail, password } = req.body;
    try {
        const tutor = yield tutorModel_1.default.findOneAndUpdate({ tutorEmail }, { isOnline: true }, { new: true });
        console.log(tutor, "I am tutor");
        if (!tutor) {
            console.log("hello");
            return res.status(400).json({ message: "No Tutor Found" });
        }
        if (tutor && (yield tutor.matchPassword(password))) {
            console.log(tutor, "mnsdfmb sdnb sdvns d");
            //generate a jwt
            const token = (0, generateToken_1.default)(tutor._id);
            console.log(token);
            return res.status(200).json({
                _id: tutor._id,
                name: tutor.tutorName,
                email: tutor.tutorEmail,
                phone: tutor.phone,
                photo: tutor.photo,
                token
            });
        }
        else {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error "
        });
    }
});
exports.tutorLogin = tutorLogin;
const tutorLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorid = req.params.id;
        const tutor = yield tutorModel_1.default.findById({ _id: tutorid }, { isOnline: false }, { new: true });
        if (!tutor) {
            res.status(404).json({ message: "Tutor Not Found" });
        }
        return res.status(200).json({ message: "Tutor Logged Out Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.tutorLogout = tutorLogout;
const updateTutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorId = req.params.id;
        const { tutorName, tutorEmail, phone } = req.body;
        const tutor = yield tutorModel_1.default.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({ message: 'User not found' });
        }
        tutor.tutorName = tutorName;
        tutor.tutorEmail = tutorEmail;
        tutor.phone = phone;
        yield tutor.save();
        console.log(tutor, "tooooooooooooooooter");
        return res.status(200).json({ message: 'Profile updated successfully', tutor });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateTutorProfile = updateTutorProfile;
const TutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hhhhhhhhhhhhhhhhh");
    const { image } = req.body;
    const tutorId = req.params.id.trim();
    console.log(tutorId, "ndbsDJFewfe");
    try {
        const tutor = yield tutorModel_1.default.findById({ _id: tutorId });
        console.log(tutor, "user");
        if (!tutor) {
            return res.status(404).json({ message: "User not found" });
        }
        tutor.photo = image;
        yield tutor.save();
        console.log(tutor, "tu");
        return res.status(200).json({ message: "Profile picture updated", tutor });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.TutorProfile = TutorProfile;
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
const getStudentByCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutorId } = req.params;
    try {
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch students" });
    }
});
exports.getStudentByCourses = getStudentByCourses;
