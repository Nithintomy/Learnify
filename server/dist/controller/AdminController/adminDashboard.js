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
exports.totalGraph = exports.TotalSales = void 0;
const Courses_1 = __importDefault(require("../../model/Courses"));
const orderModel_1 = __importDefault(require("../../model/orderModel"));
const tutorModel_1 = __importDefault(require("../../model/tutorModel"));
const userModel_1 = __importDefault(require("../../model/userModel"));
const TotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Total sales vannu");
    try {
        const totalOrderCount = yield orderModel_1.default.countDocuments({ status: "success" });
        const totalUsersCount = yield userModel_1.default.countDocuments({});
        const totalTutorCount = yield tutorModel_1.default.countDocuments({});
        const totalCourseCount = yield Courses_1.default.countDocuments({});
        const TotalRevenue = yield orderModel_1.default.aggregate([
            {
                $match: {
                    status: "success",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);
        const totals = TotalRevenue[0].total;
        res.status(200).json({
            totalOrderCount,
            totalUsersCount,
            totalTutorCount,
            totalCourseCount,
            totals
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.TotalSales = TotalSales;
const totalGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("total graph");
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const monthlySales = yield orderModel_1.default.aggregate([
            {
                $match: {
                    status: "success",
                    createdAt: {
                        $gte: new Date(currentYear, currentMonth - 1, 1),
                        $lt: new Date(currentYear, currentMonth, 1)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.json(monthlySales);
    }
    catch (error) {
        console.log(error);
    }
});
exports.totalGraph = totalGraph;
