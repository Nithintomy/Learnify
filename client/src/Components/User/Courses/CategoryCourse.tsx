import React from "react";
import { Course } from "../../../features/tutorSlice/courseSlice";

import { CoursesByCategoryList } from "./ListCourses";

interface CategoryCourseProps {
  courses: Course[];
  category: string;
}

export function CategoryCourse({ courses, category }: CategoryCourseProps) {
  return (
    <div>
      <h2 className="text-3xl font-semibold mt-5 text-gray-900">{category}</h2>

      <CoursesByCategoryList courses={courses} />
    </div>
  );
}
