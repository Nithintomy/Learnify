import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AdminBaseUrl } from "../../../Api";
import Swal from 'sweetalert2';

interface Course {
  isBlocked: any;
  isApproved: any;
  _id: string;
  courseName: string;
  coursedescription: string;
  courseFee: number;
  courseduration: number;
  photo: string;
  tutor: {
    tutorName: string;
  };
  //  other properties here if needed
}

function AdminCourse() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get(`${AdminBaseUrl}/AllCourses`)
      .then((response) => {
        console.log(response.data, "response");
        setCourses(response.data.AllCourses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const CourseStatus = async (course: Course) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          course.isApproved ? "unapprove" : "approve"
        } the course "${course.courseName}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
  console.log(course._id,"courseId")
      
    if (result.isConfirmed) {
      console.log("confirm");
      if (!course.isApproved) {
        console.log("Before approvedCourse Axios request");
        await axios.put(`${AdminBaseUrl}/approvedCourse/${course._id}`);
        console.log("After approvedCourse Axios request");
        course.isApproved = true;
        toast.success(`Course "${course.courseName}" approved successfully`);
      } else {
        console.log("Before unapprovedCourse Axios request");
        await axios.put(`${AdminBaseUrl}/unapprovedCourse/${course._id}`);
        console.log("After unapprovedCourse Axios request");
        course.isApproved = false;
        toast.success(`Course "${course.courseName}" unapproved successfully`);
      }

        // update the course status in localStorage

        localStorage.setItem(
          `user_${course._id}_status`,
          course.isBlocked ? "Not Approved" : "Approved"
        );
        setCourses([...courses]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-3">
      <ToastContainer />
      <h1 className="text-3xl p-6">Course Table</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Course
              </th>
              <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
               Tutor
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr className="border-b border-gray-200 dark:border-gray-700" key={course._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {course.courseName}
                </td>
                <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                  {course.coursedescription}
                </td>
                <td className="px-6 py-4">
                {course.tutor?.tutorName } 
                </td> 
                <td className="px-6 py-4">
                  {course.courseFee}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={`${course.photo}`}
                    alt="image"
                    style={{ width: '40px' }}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => CourseStatus(course)}
                    className={
                      course.isApproved === false
                        ? 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2'
                        : 'text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    }
                  >
                    {course.isApproved === false ? 'Not Approved' : 'Approved'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourse;
