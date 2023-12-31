import React from "react";
import { Course } from "../../../features/tutorSlice/courseSlice";
import { CoursesByCategoryList } from "./ListCourses";

interface CategoryCourseProps {
  courses: Course[];
  category: string;
}

export function CategoryCourse({ courses, category }: CategoryCourseProps) {
  return (
    <div className="mt-8 p-4 bg-white rounded-md dark:text-white dark:bg-black">
      <h2 className="text-2xl ml-14 font-semibold mb-2 text-gray-900 dark:text-white">
        {category}
      </h2>

      <CoursesByCategoryList courses={courses} />
    </div>
  );
}
