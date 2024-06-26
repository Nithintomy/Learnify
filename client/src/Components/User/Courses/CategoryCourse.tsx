import React from "react";
import { Course } from "../../../features/tutorSlice/courseSlice";
import { CoursesByCategoryList } from "./ListCourses";

interface CategoryCourseProps {
  courses: Course[];
  category: string;
}

export function CategoryCourse({ courses, category }: CategoryCourseProps) {


  return (
    <>
   

    <div className="bg-gray-200' rounded-md dark:text-white dark:bg-black">
    <div className="flex items-center justify-center dark:bg-black bg-gray-200 ">
      <div className="max-w-screen-xl w-full overflow-x-auto px-4">
      <h2 className="dark:text-white font-bold text-gray-800 mt-10 dark:border-none border-2 border-b-black text-3xl font-bitter" >
       
       
      {category}
        </h2>
      </div>
      </div>
      
      <CoursesByCategoryList courses={courses} />
    </div>
    </>
  );
}
