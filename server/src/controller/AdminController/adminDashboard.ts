import { Request, Response } from 'express';
import courseModel from "../../model/Courses";
import orderModel from "../../model/orderModel";
import TutorModel from "../../model/tutorModel";
import studentModel from "../../model/userModel";

const TotalSales = async (req: Request, res: Response) => {
    console.log("Total sales vannu")
    console.log("vannuuuuuuuuuuuuuuuuu")
    try {
        const totalOrderCount = await orderModel.countDocuments({ status: "success" });
        const totalUsersCount = await studentModel.countDocuments({});
        const totalTutorCount = await TutorModel.countDocuments({});
        const totalCourseCount = await courseModel.countDocuments({});

        const TotalRevenue = await orderModel.aggregate([
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

        const totals = TotalRevenue.length > 0 ? TotalRevenue[0].total : 0;

        res.status(200).json({
            totalOrderCount,
            totalUsersCount,
            totalTutorCount,
            totalCourseCount,
            totals
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const totalGraph = async (req:Request, res:Response) => {
    console.log("total graph");
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const monthlySales = await orderModel.aggregate([
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
    } catch (error) {
        console.log(error);
    }
};





export {TotalSales,totalGraph}
