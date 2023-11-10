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
exports.getAllCategory = exports.addCategory = void 0;
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
//add category
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoryExist = yield categoryModel_1.default.findOne({ title });
        if (categoryExist) {
            res.status(400).json({ message: 'category Already Exist' });
        }
        const category = yield categoryModel_1.default.create({
            title,
            description
        });
        if (category) {
            res.status(200).json({
                title,
                description
            });
        }
        else {
            res.status(400).json({ message: "Invalid Instructor data" });
        }
    }
    catch (error) {
        res.status(500);
        throw error;
    }
});
exports.addCategory = addCategory;
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CourseDetails = yield categoryModel_1.default.find().exec();
        if (CourseDetails) {
            res.status(200).json({
                CourseDetails
            });
        }
        else {
            return res.status(400).json({
                message: "No course Found"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCategory = getAllCategory;
