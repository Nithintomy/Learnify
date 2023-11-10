"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.default.Schema({
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "courseModel",
        requied: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "studentModel",
        requied: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});
const CartItemModel = mongoose_1.default.model("cartItemModel", cartItemSchema);
exports.default = CartItemModel;
