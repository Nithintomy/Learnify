import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl, TutorBaseUrl, UserBaseUrl } from "../../../Api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourse,
  setCourseDetails,
  setLessons,
} from "../../../features/tutorSlice/courseSlice";
import { Course, Lesson } from "../../../features/tutorSlice/courseSlice";
import { addToCart } from "../../../features/userSlice/cartSlice";

function SinglePageView() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector(selectCourse);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const handleAddToCart = (courseDetails: Course | null) => {
    dispatch(addToCart(courseDetails));
  };

  useEffect(() => {
    // Fetch course details based on the courseId
    axios
      .get<Course>(`${TutorBaseUrl}/getCourse/${courseId}`) // Use the courseId from the URL
      .then((response) => {
        dispatch(setCourseDetails(response.data));
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch lessons for the course and dispatch the action
    axios
      .get<Lesson[]>(`${TutorBaseUrl}/getLessons/${courseId}`)
      .then((response) => {
        console.log(response, "response userside ");
        dispatch(setLessons(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId, dispatch]);



  console.log("myr courseid", courseDetails?._id);
  console.log("myr tutorid", courseDetails?.tutor);
  console.log("myr courseid");

  const checkoutHandler = async () => {
    const amount = courseDetails?.courseFee;

   

    const requestData = {
      studentId: userData?.user._id,
      courseId: courseDetails?._id,
      tutorId: courseDetails?.tutor?._id,
      amount 
    };


    try {
      const {
        data: { key },
      } = await axios.get(`${BaseUrl}/api/checkout/getKey`);

      const {
        data: { order },
      } = await axios.post(`${BaseUrl}/api/checkout/payment`, {
        amount: amount,
      });

      var options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: "INR",
        name: userData.studentName,
        description: "Razorpay",
        image: userData.photo,
        order_id: order.id,
        body: JSON.stringify({ requestData }),
  
        callback_url: `${BaseUrl}/api/checkout/verifyPayment?studentId=${requestData.studentId}&courseId=${requestData.courseId}&tutorId=${requestData.tutorId}&amount=${requestData.amount}`, // Include the amount in the callback URL
  
        prefill: {
          name: userData.studentName,
          email: userData.studentEmail,
          contact: userData.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000000",
        },
      };
      // Check if the element exists
      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
      {/* Right Side: Course Image */}
      <div className="md:w-1/2">
        <img
          src={courseDetails?.photo}
          alt="Course Image"
          className="w-96 h-72"
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
          <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
            Course Details
          </h6>
          <ul className="list-disc ml-6">
            <li>{courseDetails?.courseduration} hours</li>
            <li>Start Date: October 1, 2023</li>
            <li>Course Fee: ${courseDetails?.courseFee}</li>
          </ul>
        </div>

        <button
          onClick={() => {
            if (userData) {
              checkoutHandler();
              console.log("hai");
            } else {
              alert("Please Login to Buy the Course");
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Buy Now
        </button>
        <button
          onClick={() => handleAddToCart(courseDetails)}
          className="bg-deep-orange-400 hover:bg-deep-orange-600 text-white font-semibold py-2 px-4 mt-3 rounded-lg"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default SinglePageView;
