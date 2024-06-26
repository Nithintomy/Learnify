import React, { useEffect, useState } from "react";
import axios from "axios";
import AvgStarRating from "./AvgStarRating";
import { BaseUrl, UserBaseUrl } from "../../../Api";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourse,
  setCourseDetails,
} from "../../../features/tutorSlice/courseSlice";
import { Course, Lesson } from "../../../features/tutorSlice/courseSlice";
import toast, { Toaster } from "react-hot-toast";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { DotLoader } from "react-spinners";

interface Rating {
  user: {
    photo: string | undefined;
    studentName: string;
  };
  rating: number;
  comment: string;
}

function SinglePages() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector(selectCourse);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [imageLoading, setImageLoading] = useState(true);

  console.log(userData, "userdata illa");

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePlayClick = (videoUrl: string, _index: number) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleAddToCart = () => {
    if (userData.user) {
      axios
        .post(`${UserBaseUrl}/add-to-cart`, {
          courseId: courseDetails?._id,
          userId: userData.user._id,
          quantity: 1,
        })
        .then((response) => {
          console.log(response, "added to cart");
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error occur while adding to cart", error);
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please log in to add the course to your cart.");
    }
  };

  useEffect(() => {
    // Fetch course details based on the courseId
    axios
      .get<Course>(`${UserBaseUrl}/getCourse/${courseId}`) // Use the courseId from the URL
      .then((response) => {
        dispatch(setCourseDetails(response.data));
        // Check enrollment status for this course
        checkEnrollmentStatus(response.data._id);
        setImageLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${UserBaseUrl}/allLessons/${courseId}`)
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch the Rating for the course and calculate the average
    axios
      .get(`${UserBaseUrl}/ratings/${courseId}`)
      .then((response) => {
        setRatings(response.data);
        // Calculate the average rating
        if (response.data.length > 0) {
          const totalRating = response.data.reduce(
            (acc: number, rating: { rating: number }) => acc + rating.rating,
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
      amount,
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
      <section className="text-gray-600 dark:text-white body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {imageLoading ? (
               <div className="flex justify-center items-center h-64">
               <DotLoader color="#6A64F1" size={30} />
             </div>
            ) : (
              <img
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={courseDetails?.photo}
                alt="Course Image"
              />
            )}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm dark:text-white title-font text-gray-500 tracking-widest">
                COURSE NAME
              </h2>
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                {courseDetails?.courseName}
              </h1>
              <h6 className="text-sm underline font-semibold text-gray-900 dark:text-white">
                Course Details
              </h6>
              <div className="flex mt-2">
                <span className="flex">
                  <AvgStarRating rating={averageRating} />
                  <span className="text-gray-600 ml-3">
                    ({ratings.length} Reviews){" "}
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">
                {courseDetails?.coursedescription}
              </p>

              <p className="leading-loose">
                <h6>Start Date: October 1, 2023</h6>
              </p>

              <div className="flex mt-5">
                <span className="title-font dark:text-white font-medium text-md text-gray-900">
                  <p>Course Fee: ${courseDetails?.courseFee}</p>
                </span>
              </div>
              <div>
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
                        if (userData.user) {
                          checkoutHandler();
                        } else {
                          toast.error("Please Login to Buy the Course");
                        }
                      }}
                      className="btn btn-active btn-accent px-8"
                    >
                      Buy Now
                      <StorefrontIcon />
                    </button>
                    <button
                      className="btn btn-active btn-neutral m-6"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                      <ShoppingCartCheckoutIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-4/5 mx-auto m-5">
            <h2 className="font-bold text-gray-800 mb-4 border-b-4 pb-2 text-xl font-bitter">
              LESSONS
            </h2>

            {lessons.length === 0 ? (
              <p className="text-gray-600">No lessons available.</p>
            ) : (
              lessons.slice(0,1).map((lesson, index) => (
                <div key={lesson._id} className="mb-4 border rounded-lg">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between w-full p-4 text-black bg-white hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="text-lg font-semibold">
                      {lesson.title}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform transform ${
                        activeIndex === index ? "rotate-180" : "rotate-0"
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
                      <p className="text-gray-700 mb-2">{lesson.description}</p>
                      <p className="mb-2">
                        Duration: {lesson.duration} minutes
                      </p>
                      <button
                        onClick={() => handlePlayClick(lesson.video[0], index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mb-2"
                      >
                        Play Now
                        <PlayCircleOutlineIcon className="ml-2" />
                      </button>
                      <p className="text-gray-600">
                        Updated At: {lesson.updatedAt}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Video Modal */}
            {showVideoModal && (
              <dialog open id="my_modal_4" className="modal">
                <div className="modal-box w-4/5 h-4/5 flex justify-center items-center">
                  <form method="dialog">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
                      onClick={() => setShowVideoModal(false)}
                    >
                      ✕
                    </button>
                  </form>
                  <video
                    controls
                    width="100%"
                    height="100%"
                    src={currentVideoUrl}
                    autoPlay={isPlaying}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  >
                    Your browser does not support the video.
                  </video>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ display: isPlaying ? "none" : "block" }}
                  ></div>
                </div>
              </dialog>
            )}

            {lessons.length > 1 && !isEnrolled && (
              <div className="border rounded-lg">
                <button
                  onClick={() =>
                    toast.error("Please buy the course to unlock more lessons.")
                  }
                  className="flex justify-between w-full p-4 bg-white text-black hover:bg-gray-300 focus:outline-none"
                >
                  <span className="text-lg font-semibold">
                    Unlock More Lessons
                  </span>
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

          {isEnrolled && (
            <div>
              <h2 className="text-xl font-semibold mt-14 mb-4">
                Ratings and Comments
              </h2>
              {ratings.length === 0 && (
                <h1 className="text-black font-semibold">No ratings yet.</h1>
              )}

              {ratings.map((item, index) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-header text-black font-semibold m-2">
                    {item?.user?.studentName}
                  </div>

                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={item?.user?.photo}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">
                    <p className="text-sm font-semibold">
                      Comment: {item.comment}
                    </p>
                    <p className="text-sm font-semibold">
                      Rating: {item.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Toaster position="top-right" containerClassName="p-8 m-8" />
        </div>
      </section>
    </>
  );
}

export default SinglePages;
