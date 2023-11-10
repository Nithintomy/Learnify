"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'courseModel'
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'categorycollection',
        required: true,
    },
    video: [{
            type: String,
            required: true
        }],
    tutorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "tutorModel"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });
const lessonModel = mongoose_1.default.model('lessonModel', lessonSchema);
exports.default = lessonModel;
