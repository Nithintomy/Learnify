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
exports.allLessons = void 0;
const lesson_1 = __importDefault(require("../../model/lesson"));
const allLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("lesson lu keri");
    try {
        const courseId = req.params.courseId;
        console.log(courseId, "courseId match naoo");
        const lessons = yield lesson_1.default.find({ courseId });
        if (lessons) {
            console.log(lessons, "lesson ondu");
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
});
exports.allLessons = allLessons;
