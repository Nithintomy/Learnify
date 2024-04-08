import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import { Course } from "../../../features/tutorSlice/courseSlice";
import { Link } from "react-router-dom";
import { RingLoader } from 'react-spinners';

function CourseCards() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allCourses`)
      .then((response) => {
        console.log(response.data.allcourse);
        setCourses(response.data.allcourse);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);

  const filteredCourses = showAllCourses ? courses : courses.slice(0, 3);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-wrap">
        {filteredCourses.map((course, index) => (
          <div key={index} className="m-4">
            <div className="card card-compact w-96 bg-base-200 shadow-2xl border bottom-6">
              <figure className="p-2 rounded-lg m-3">
                <img src={course.photo} className="rounded-lg" alt="Courses" style={{ width: '100%', height: '180px' }} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{course.courseName}</h2>
                <p className="font-semibold text-gray-600">{course.coursedescription}</p>
                <p className="text-xl font-bold font-serif"> Rs: {course.courseFee} /-</p>
                <div className="card-actions justify-end">
                  <Link to={`/singlePage/${course._id}`}>
                    <button className="btn btn-primary">View Course</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!showAllCourses && courses.length > 3 && (
        <div className="flex justify-center mt-4">
          <button className="btn btn-secondary" onClick={() => setShowAllCourses(true)}>View All Courses</button>
        </div>
      )}
    </>
  );
}

export default CourseCards;
