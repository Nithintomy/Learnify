"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500 //maximum length of comment
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "studentModel",
        required: true,
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "courseModel",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const RatingModel = mongoose_1.default.model("Rating", ratingSchema);
exports.default = RatingModel;
