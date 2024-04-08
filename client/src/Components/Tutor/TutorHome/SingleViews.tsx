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
import toast, { Toaster } from "react-hot-toast";


function SingleViews() {
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
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto ml-10 flex justify-center items-center">
      <div className="lg:w-1/3 w-full group m-5 justify-center">
          <img
            className="transition group-hover:scale-110 object-cover object-center rounded-lg"
            src={courseDetails?.photo}
            alt="Course Image"
          />
        </div>
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
            COURSE NAME
          </h2>
          <h1 className="text-gray-900 uppercase text-3xl title-font font-medium mb-1">
            {courseDetails?.courseName}
          </h1>
          <h6 className="text-sm underline font-semibold text-gray-900 dark:text-white">
            Course Details
          </h6>
          <p className="leading-relaxed">{courseDetails?.coursedescription}</p>
          <p className="leading-loose">
            <h6>Start Date: October 1, 2023</h6>
          </p>
          <div className="flex mt-5">
            <span className="title-font font-medium text-md text-gray-900">
              <p>Course Fee: ${courseDetails?.courseFee}</p>
            </span>
          </div>
          <div>
            <Link to="/my_students">
              <button className="btn btn-active btn-accent text-white font-semibold py-2 px-4 rounded-lg">
                View Students
              </button>
            </Link>
            <button
              onClick={openEditModal}
              className="btn btn-active btn-neutral m-6 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Edit Course
            </button>
            <EditCourseModal
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              courseDetails={courseDetails || null}
              onSave={(editedCourse) => {
                dispatch(updateCourseDetails(editedCourse));
                axios
                  .put(
                    `${TutorBaseUrl}/updateCourse/${courseId}`,
                    editedCourse
                  )
                  .then((response) => {
                    toast.success("Course updated Successfully")
                    console.log(
                      "Course updated in the backend:",
                      response.data
                    );
                  })
                  .catch((error) => {
                    console.error(
                      "Error updating course in the backend:",
                      error
                    );
                  });
              }}
            />
          </div>
        </div>
      
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </section>
  );
  
}

export default SingleViews;
