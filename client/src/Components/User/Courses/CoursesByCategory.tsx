import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Course } from "../../../features/tutorSlice/courseSlice";
import { CategoryCourse } from "../../../Components/User/Courses/CategoryCourse";
import { UserBaseUrl } from "../../../Api";
import { RingLoader } from 'react-spinners';


export function CoursesByCategory() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allCourses`)
      .then((response) => {
        console.log(response.data.allcourse);
        setCourses(response.data.allcourse);
        setLoading(false)
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
  </div>
  }

  // Group courses by category
  const coursesByCategory: Record<string, Course[]> = courses.reduce((result, course) => {
    const category = course.category.title; 
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(course);
    return result;
  }, {} as Record<string, Course[]>);

  return (
    <div>
      <ToastContainer />
      {Object.entries(coursesByCategory).map(([category, courses]) => (
        <CategoryCourse key={category} courses={courses} category={category} />
      ))}
    </div>
  );
}
