import { Request,Response } from 'express';
import courseModel from '../../model/Courses';


const AdminapproveCourse = async (req: Request, res: Response) => {
    console.log("Hello i am here")
    try {
        const { id } = req.params;

        const courseApproved = await courseModel.findByIdAndUpdate(id, { isApproved: true });

        if (!courseApproved) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course approved" });
    } catch (error) {
        console.error("Error approving course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const AdminUnApprovedCourse =async(req:Request,res:Response)=>{

    console.log("HEllo Betta")
        try {
            
            
            const { id } = req.params;
            console.log(req.params,"adjasb")

    
            const course = await courseModel.findByIdAndUpdate(id, { isApproved: false });
    
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
    
            return res.status(200).json({ message: "Course unapproved successfully" });
        } catch (error) {
            console.error("Error unapproving course:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

const getCourses =async(req:Request,res:Response)=>{
    console.log("geting courses")
    try {
     
        const AllCourses = await courseModel.find().populate('tutor').populate('category')

      console.log(AllCourses,"ALl Courses")
        if(AllCourses){
            res.status(200).json({AllCourses})
        }
        
    } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }


}


export { AdminapproveCourse ,AdminUnApprovedCourse,getCourses};