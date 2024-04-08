import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Course } from "../../../features/tutorSlice/courseSlice";
import { CategoryCourse } from "../../../Components/User/Courses/CategoryCourse";
import { UserBaseUrl } from "../../../Api";
import { RingLoader } from 'react-spinners';


export function CoursesByCategory() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

    // Filter courses 
    const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Group courses by category
  const coursesByCategory: Record<string, Course[]> = filteredCourses.reduce((result, course) => {
    const category = course.category.title; 
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(course);
    return result;
  }, {} as Record<string, Course[]>);

  return (
    <div>
      <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-black rounded-full">
  <input
     type="text"
     placeholder="Search courses"
    className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button
    type="submit"
    className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
  >
    <svg
      className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    Search
  </button>
</div>

   
      {Object.entries(coursesByCategory).map(([category, courses]) => (
        <CategoryCourse key={category} courses={courses} category={category} />
      ))}
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
}
