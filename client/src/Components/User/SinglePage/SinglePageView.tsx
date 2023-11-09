import React, { useEffect, useState } from "react";
import axios from "axios";
import AvgStarRating from "./AvgStarRating";
import { BaseUrl, TutorBaseUrl, UserBaseUrl } from "../../../Api";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourse,
  setCourseDetails,
  
} from "../../../features/tutorSlice/courseSlice";
import { Course, Lesson } from "../../../features/tutorSlice/courseSlice";
import { ToastContainer, toast } from "react-toastify";
import VideoPlayer from "../../Tutor/TutorHome/VideoPlayer";




function SinglePageView() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector(selectCourse);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handlePlayClick = (videoUrl: string, index: number) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
   
    setCurrentVideoUrl('');
    setShowVideoModal(false);
  
  };
  

  const handleAddToCart = () => {
    axios.post(`${UserBaseUrl}/add-to-cart`, {
      courseId: courseDetails?._id,
      userId: userData.user._id,
      quantity: 1
    })
      .then((response) => {
        console.log(response,"added to cart")
        toast.success("Product added to cart Successfully");
        setLessons(response.data);
       
      })
      .catch((error) => {
        console.error("Error occur while adding to cart", error);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    // Fetch course details based on the courseId
    axios
      .get<Course>(`${UserBaseUrl}/getCourse/${courseId}`) // Use the courseId from the URL
      .then((response) => {
        dispatch(setCourseDetails(response.data));
        // Check enrollment status for this course
        checkEnrollmentStatus(response.data._id);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${UserBaseUrl}/allLessons/${courseId}`)
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch the Rating for the course and calculate the average
    axios.get(`${UserBaseUrl}/ratings/${courseId}`)
      .then((response) => {
        setRatings(response.data);
        // Calculate the average rating
        if (response.data.length > 0) {
          const totalRating = response.data.reduce(
            (acc, rating) => acc + parseFloat(rating.rating),
            0
          );
          const avgRating = totalRating / response.data.length;
          setAverageRating(avgRating);
        } else {
          setAverageRating(0);
        }
      })
      .catch((error) => {
        console.error("Error occur while fetching ratings", error);
      });
  }, [courseId, dispatch]);
 
  const checkEnrollmentStatus = async (courseId: any) => {
    if (userData && courseId) {
      try {
        // Check if the course exists in the user's orders
        const response = await axios.get(
          `${UserBaseUrl}/check-enrollment/${userData.user._id}/${courseId}`
        );
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    }
  };

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
        key,
        amount: order.amount,
        currency: "INR",
        name: userData.studentName,
        description: "Razorpay",
        image: userData.photo,
        order_id: order.id,
        body: JSON.stringify({ requestData }),
        callback_url: `${BaseUrl}/api/checkout/verifyPayment?studentId=${requestData.studentId}&courseId=${requestData.courseId}&tutorId=${requestData.tutorId}&amount=${requestData.amount}`,
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
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 hover:bg-opacity-80 dark:bg-gray-800 dark:hover-bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={courseDetails?.photo}
            alt="Course Image"
            className="w-96 h-72"
          />
        </div>
        <div className="flex flex-col justify-between p-6 md:w-1/2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {courseDetails?.courseName}
          </h5>
          <p className="mb-3 font-normal text-black dark:text-gray-400">
            {courseDetails?.coursedescription}
          </p>
          <div className="mb-3">
            <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
              Course Details
            </h6>
            <ul className="list-disc ml-6">
              <li>{courseDetails?.courseduration} hours</li>
              <li>Start Date: October 1, 2023</li>
              <li>Course Fee: ${courseDetails?.courseFee}</li>
            </ul>
            <p>
              <AvgStarRating rating={averageRating} /> ({ratings.length} ratings)
            </p>
          </div>
          {isEnrolled ? (
           <Link to="/enrolled-courses">
           <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
             Enrolled
           </button>
         </Link>
          ) : (
            <>
              <button
                onClick={() => {
                  if (userData) {
                    checkoutHandler();
                  } else {
                    alert("Please Login to Buy the Course");
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-deep-orange-400 hover-bg-deep-orange-600 text-white font-semibold py-2 px-4 mt-3 rounded-lg"
              >
                ADD TO CART
              </button>
            </>
          )}
        </div>
      </div>
      <div className="max-w-lg mx-auto m-5">
        {lessons.slice(0, 1).map((lesson, index) => (
          <div key={lesson._id} className="mb-4 border rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between w-full p-4 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-lg font-semibold">{lesson.title}</span>
              <svg
                className={`w-5 h-5 transition-transform transform ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white">
                <p className="text-gray-700">{lesson.description}</p>
                <p>Duration: {lesson.duration} minutes</p>
                <p>Category: {lesson.categoryId}</p>
                <button
                  onClick={() => handlePlayClick(lesson.video[0], index)}
                  className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
                >
                  Play Now
                </button>
                <p>updatedAt: {lesson.updatedAt}</p>
              </div>
            )}
          </div>
        ))}
        {showVideoModal && (
          <VideoPlayer videoUrl={currentVideoUrl} onClose={handleCloseVideoModal} />
        )}
        {lessons.length > 1 && !isEnrolled && (
          <div className="mb-4 border rounded-lg">
            <button
              onClick={() => toast.error("Please buy the course to unlock more lessons.")}
              className="flex justify-between w-full p-4 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-lg font-semibold">Unlock More Lessons</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mt-14 mb-4">Ratings and Comments</h2>
      <ul>
        {ratings.map((item, index) => (
          <li key={index} className="mb-4">
            <div className="border p-4 border-secondary w-400">
              <p className="text-secondary font-semibold">User: {item?.user?.studentName}</p>
              <p className="text-lg font-semibold">Rating: {item.rating}</p>
              <p className="mt-2">Comment: {item.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
 
  );
}

export default SinglePageView;
