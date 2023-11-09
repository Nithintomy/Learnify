import axios from "axios";
import React, { useEffect, useState } from "react";
import { TutorBaseUrl } from "../../../Api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourse,
  setCourseDetails,
  setLessons,
  updateCourseDetails,
} from "../../../features/tutorSlice/courseSlice";
import { Course, Lesson } from "../../../features/tutorSlice/courseSlice";
import EditCourseModal from "./EditCourseModal";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

function SingleView() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector(selectCourse);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  console.log(courseId, "courseId");

  useEffect(() => {
    // Fetch course details based on the courseId
    axios
      .get<Course>(`${TutorBaseUrl}/getCourse/${courseId}`) // Use the courseId from the URL
      .then((response) => {
        dispatch(setCourseDetails(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch lessons for the course and dispatch the action
    axios
      .get<Lesson[]>(`${TutorBaseUrl}/getLessons/${courseId}`)
      .then((response) => {
        console.log(response, "response annu  ");
        dispatch(setLessons(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId, dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RingLoader
          loading={true}
          color="#000000"
          speedMultiplier={1}
          size={150}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
    {/* Right Side: Course Image */}
    <div className="md:w-1/2">
      <img
        src={courseDetails?.photo}
        alt="Course Image"
        className="object-cover"
        style={{ width: "200vh", height: "400px" }}
      />
    </div>
  
    {/* Left Side: Course Details */}
    <div className="flex flex-col justify-between p-6 md:w-1/2">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {courseDetails?.courseName}
      </h5>
      <p className="mb-3 font-normal text-black dark:text-gray-400">
        {courseDetails?.coursedescription}
      </p>
  
      {/* Add your course details section here */}
      <div className="mb-3">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">Course Details</h6>
        <ul className="list-disc ml-6">
          <li>{courseDetails?.courseduration} hours</li>
          <li>Start Date: October 1, 2023</li>
          <li>Course Fee: ${courseDetails?.courseFee}</li>
        </ul>
      </div>
  
      <div className="flex space-x-4"> {/* Add this container for flex layout */}
        <Link to="/my_students">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-[max-content]">
            View Students
          </button>
        </Link>
  
        <button
          className="bg-deep-orange-500 hover:bg-deep-orange-800 text-white font-semibold py-2 px-4 rounded-lg w-[max-content]"
          onClick={openEditModal}
        >
          Edit Course
        </button>
      </div>
    </div>
  
    <EditCourseModal
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      courseDetails={courseDetails || null}
      onSave={(editedCourse) => {
        dispatch(updateCourseDetails(editedCourse));
  
        axios
          .put(`${TutorBaseUrl}/updateCourse/${courseId}`, editedCourse)
          .then((response) => {
            console.log("Course updated in the backend:", response.data);
          })
          .catch((error) => {
            console.error("Error updating course in the backend:", error);
          });
      }}
    />
  </div>
  
  );
}

export default SingleView;
