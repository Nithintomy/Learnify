"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema = new mongoose_1.default.Schema({
    chatName: {
        type: String,
        trim: true
    },
    users: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "studentModel",
        }
    ],
    latestMessage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Message",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Chat", ChatSchema);
