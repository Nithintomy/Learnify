import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define custom types for Course and Lesson
export interface Course {
  category: any;
  _id: string;
  courseId: {
    photo: string;
    courseName: string;
    rating: number;
    coursedescription: string;
    courseFee: number;
   
  };
  courseName: string;
  coursedescription: string;
  courseFee: number;
  rating: number;
  courseduration: number;
  photo: string;
  tutor: {
    _id: string; 
    phone:number;
    tutorEmail:string;
    tutorName:string;
    
  };
  tutorName: string;
  lessons: Lesson[];
}

export interface Lesson {
  _id: string;
  title: string;
  duration: number;
  description: string;
  category: string;
  video: string;
  updatedAt:string
}

 

// Defining the types of state
interface CourseState {
  courseDetails: Course | null;
  lessons: Lesson[];
}

const initialState: CourseState = {
  courseDetails: null,
  lessons: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseDetails: (state, action: PayloadAction<Course | null>) => {
      state.courseDetails = action.payload;
    },
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
    updateCourseDetails:(state,action: PayloadAction<Course>)=>{
      const editedCourse = action.payload;
      state.courseDetails ={...state.courseDetails ,...editedCourse}
    }
  },
});

export const { setCourseDetails, setLessons, updateCourseDetails } = courseSlice.actions;
export const selectCourse = (state: { course: CourseState }) => state.course.courseDetails;
export const selectLesson = (state: { course: CourseState }) => state.course.lessons;

export default courseSlice.reducer;
