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
exports.getTutorsById = exports.Tutors = exports.updateProfile = exports.studentProfile = exports.ResetPassword = exports.sendPasswordLink = exports.studentLogout = exports.GoogleSignUp = exports.GoogleSignin = exports.verify_otp = exports.resend_otp = exports.studentSignUp = exports.studentLogin = void 0;
const userModel_1 = __importDefault(require("../../model/userModel"));
const generateToken_1 = __importDefault(require("../../Utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const globalData = {
    otp: null,
    newOtp: null,
    user: null,
};
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "nithintomy8281@gmail.com",
        pass: "fdhqztoqusjqmclp",
    },
});
//studentSignUp
const studentSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentName, studentEmail, password, phone } = req.body;
        console.log(req.body);
        if (!studentName || !studentEmail || !password || !phone) {
            return res.status(400).json({ message: "All Field Required" });
        }
        const userExist = yield userModel_1.default.findOne({ studentEmail });
        console.log(userExist, "I am exist");
        const userphone = yield userModel_1.default.findOne({ phone });
        if (userExist) {
            return res.status(400).json({
                message: "User Email Already Exist",
            });
        }
        else if (userphone) {
            return res.status(400).json({
                message: "Phone Number Already Exist",
            });
        }
        const user = {
            studentName,
            studentEmail,
            phone,
            password,
        };
        globalData.user = user;
        // Generate OTP and store it in globalData
        const otp = parseInt((Math.random() * 1000000).toString(), 10);
        globalData.otp = otp;
        const mailOptions = {
            from: "nithintomy8281@gmail.com",
            to: studentEmail,
            subject: "Sending Email using Node.js",
            html: "<h3>OTP for account verification is </h3>" +
                "<h1 style='font-weight:bold;'>" +
                otp +
                "</h1>",
            text: "That was easy!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending OTP email:", error);
                return res.status(500).json({ message: "Error sending OTP email" });
            }
            else {
                console.log("OTP email sent successfully:", info.response);
                return res.status(200).json({ message: "OTP sent to your email" });
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.studentSignUp = studentSignUp;
const resend_otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am resending");
    try {
        const { studentEmail } = req.body;
        console.log(studentEmail, "email anney");
        // Generate a new OTP
        const newOtp = parseInt((Math.random() * 1000000).toString(), 10);
        globalData.otp = newOtp;
        const mailOptions = {
            from: "nithintomy8281@gmail.com",
            to: studentEmail,
            subject: "Resending OTP using Node.js",
            html: "<h3>New OTP for account verification is </h3>" +
                "<h1 style='font-weight:bold;'>" +
                newOtp +
                "</h1>",
            text: "That was easy!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending OTP email:", error);
                return res.status(500).json({ message: "Error sending OTP email" });
            }
            else {
                console.log("New OTP email sent successfully:", info.response);
                return res.status(200).json({ message: "New OTP sent to your email" });
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.resend_otp = resend_otp;
//verify Otp
const verify_otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am here");
    try {
        const { otp } = req.body;
        console.log("otp:", otp);
        console.log("globalData.otp:", globalData.otp);
        if (parseInt(otp, 10) === globalData.otp) {
            console.log("enter if condition");
            const addUser = yield userModel_1.default.create(globalData.user);
            const token = (0, generateToken_1.default)(addUser._id);
            return res.status(200).json({
                _id: addUser === null || addUser === void 0 ? void 0 : addUser._id,
                name: addUser === null || addUser === void 0 ? void 0 : addUser.studentName,
                email: addUser === null || addUser === void 0 ? void 0 : addUser.studentEmail,
                phone: addUser === null || addUser === void 0 ? void 0 : addUser.phone,
                token,
            });
        }
        else {
            console.log("else otp case");
            // Return a 400 status code for incorrect OTP
            return res.status(400).json({ message: "Wrong otp" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }
});
exports.verify_otp = verify_otp;
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentEmail, password } = req.body;
        console.log(req.body);
        const user = yield userModel_1.default.findOne({ studentEmail });
        if (!user) {
            return res.status(401).json({ message: "Invalid user " });
        }
        if ((user === null || user === void 0 ? void 0 : user.isBlocked) === true) {
            return res.status(401).json({ message: "User is Blocked" });
        }
        if (user && (yield user.matchPassword(password))) {
            //generate Token
            const token = (0, generateToken_1.default)(user._id);
            console.log(token);
            return res.json({
                user,
                token
            });
        }
        else {
            return res.status(401).json({ message: "Invalid Email and Password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "server Error " });
    }
});
exports.studentLogin = studentLogin;
const GoogleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.credential;
    const decode = jsonwebtoken_1.default.decode(token);
    console.log(decode, "decode");
    let studentEmail;
    let studentName;
    let photo;
    if (decode) {
        const { name, email, picture, jti } = decode;
        studentEmail = email;
        studentName = name;
        photo = picture; // Assign the value to 'picture'
        if (studentName && studentEmail && photo && jti) {
            console.log(name, email, photo, jti);
        }
        else {
            console.log("jwt payload is missing some properties");
        }
    }
    else {
        console.log("Token is not valid or Expired");
    }
    try {
        const userExist = yield userModel_1.default.findOne({ studentEmail });
        console.log(userExist, "I am exist");
        if (userExist) {
            return res.status(400).json({
                message: "User Email Already Exist",
            });
        }
        const newUser = yield userModel_1.default.create({
            studentName: studentName,
            studentEmail: studentEmail,
            photo: photo, // Initialize with 'picture'
        });
        console.log("User saved", newUser);
        res.status(200).json({ message: "User saved successfully" });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }
});
exports.GoogleSignUp = GoogleSignUp;
//Google SignIn
const GoogleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.credential;
    const decode = jsonwebtoken_1.default.decode(token);
    let studentEmail;
    if (decode) {
        const { name, email, picture, jti } = decode;
        studentEmail = email;
        if (name && email && picture && jti) {
            console.log(name, email, picture, jti);
        }
        else {
            console.log("jwt payload is missing some properties");
        }
    }
    else {
        console.log("Token is not valid or Expired");
    }
    try {
        const user = yield userModel_1.default.findOne({ studentEmail });
        console.log(user);
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        else {
            if (user.isBlocked) {
                return res.json({ message: "User is blocked" });
            }
            if (user) {
                // Generate a token for the user
                const token = (0, generateToken_1.default)(user._id);
                user.password = "";
                return res.json({
                    user,
                    token
                });
            }
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }
});
exports.GoogleSignin = GoogleSignin;
//send Email Link For Reset Password
const sendPasswordLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, "body");
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return res.status(401).json({ message: "Enter Your Email" });
    }
    try {
        console.log("Hello");
        const user = yield userModel_1.default.findOne({ studentEmail: email });
        if (!user) {
            console.log("riiiiii");
            return res.status(400).json({ message: "Email not found in the database" });
        }
        if (user) {
            //generate Token
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "120s",
            });
            console.log(token);
            const setUsertoken = yield userModel_1.default.findByIdAndUpdate({ _id: user._id }, { verifyToken: token }, { new: true });
            // email Config
            console.log(setUsertoken, "setUsertoken");
            if (setUsertoken) {
                const mailOptions = {
                    from: "nithintomy8281@gmail.com",
                    to: email,
                    subject: "Sending Email for password Reset",
                    text: `This Link Valid For 2 minutes http://localhost:3000/reset-password/${user._id}/${token}`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error, "error");
                        return res
                            .status(403)
                            .json({ message: "Something went wrong Email not sent" });
                    }
                    else {
                        console.log("Email Send", info.response);
                        return res.status(201).json({ Status: 'Success', message: 'Password reset successful' });
                    }
                });
            }
        }
        else {
            return res.status(401).json({ Status: 'Error', message: 'Password not updated' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Status: 'Error', message: 'Internal server error' });
    }
});
exports.sendPasswordLink = sendPasswordLink;
//reset Password 
const ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log("Good boy");
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password; // Replace 'newPassword' with the actual password
        yield user.save();
        console.log("PAssword Change");
        res.status(200).json({ Status: 'Success', message: 'Password reset successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Status: 'Error', message: 'Internal server error' });
    }
});
exports.ResetPassword = ResetPassword;
//get All tutors List
const Tutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTutors = yield tutorModel_1.default.find().exec();
    res.status(200).json({
        allTutors,
    });
});
exports.Tutors = Tutors;
const studentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hhhhhhhhhhhhhhhhh");
    const { image } = req.body;
    const userId = req.params.id.trim();
    console.log(userId);
    try {
        const user = yield userModel_1.default.findById({ _id: userId });
        console.log(user, "user");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.photo = image;
        yield user.save();
        return res.status(200).json({ message: "Profile picture updated", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.studentProfile = studentProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { studentName, studentEmail, phone } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.studentName = studentName;
        user.studentEmail = studentEmail;
        user.phone = phone;
        yield user.save();
        return res.status(200).json({ message: 'Profile updated successfully', user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateProfile = updateProfile;
const studentLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        else {
            yield user.save();
            res.status(200).json({ message: "user Logout Successfully" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.studentLogout = studentLogout;
const getTutorsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.tutorId, "id");
    console.log("hiohi");
    try {
        const tutor = yield tutorModel_1.default.findById(req.params.tutorId);
        console.log(tutor, "gfda");
        res.json(tutor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tutor details" });
    }
});
exports.getTutorsById = getTutorsById;
