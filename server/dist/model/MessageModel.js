"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatMessageSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'studentModel', // Reference to your student model
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Chat"
    },
}, {
    timestamps: true
});
const MessageModel = mongoose_1.default.model('Message', chatMessageSchema);
exports.default = MessageModel;
