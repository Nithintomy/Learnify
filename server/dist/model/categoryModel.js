"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: [{
            type: String
        }],
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
// const categoryModel= mongoose.model("categoryCollection",categorySchema)
const categoryModel = (0, mongoose_1.model)("categoryModel", categorySchema);
exports.default = categoryModel;
