import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { Toaster, toast } from "react-hot-toast";
import { Course} from "../../../features/tutorSlice/courseSlice";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { BsEyeFill } from "react-icons/bs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

function CourseCard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

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

  const handleAddToCart = async (courseId: string) => {
    if (userData.user) {
      try {
        // Check enrollment status
        const response = await axios.get(
          `${UserBaseUrl}/check-enrollment/${userData.user._id}/${courseId}`
        );
        const isEnrolled = response.data.isEnrolled;
        
        if (isEnrolled) {
          // Show toast indicating the course is already purchased
          toast.error("You have already purchased this course.");
        } else {
          // Add the course to the cart
          await axios.post(`${UserBaseUrl}/add-to-cart`, {
            courseId: courseId,
            userId: userData.user._id,
            quantity: 1,
          });
          toast.success("Course added to cart successfully.");
        }
      } catch (error) {
        console.error("Error checking enrollment status or adding to cart:", error);
        toast.error("Something went wrong.");
      }
    } else {
      toast.error("Please log in to add the course to your cart.");
    }
  };
  

  const filteredCourses = showAllCourses ? courses : courses.slice(0, 3);

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCourses.map((course, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={course.photo}
                alt={course.courseName}
                className="rounded-xl w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.courseName}</h2>
              <p className="text-gray-700 text-base mb-2">
                {truncateText(course.coursedescription, 30)}
              </p>

              <div className="text-gray-900 font-bold text-lg">
                Price: {course.courseFee}
                <span className="text-xs text-gray-600"> /-</span>{" "}
              </div>
              <div className="text-gray-900 font-extralight text-md mb-5">
                Duration:  {course.courseduration}
                <span className="text-xs text-gray-600"> mins</span>{" "}
              </div>
             

              <div className="card-actions">
                <Link to={`/singlePage/${course._id}`} className="inline-block">
                  <button className="btn btn-outline btn-success flex items-center">
                    <span>Details</span>
                    <BsEyeFill className="ml-1" />
                  </button>
                </Link>

                <button
                  onClick={() => handleAddToCart(course._id)}
                  className="btn btn-outline btn-warning"
                >
                  Add to Cart
                  <AddShoppingCartIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!showAllCourses && courses.length > 3 && (
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setShowAllCourses(true)}
          >
            View All Courses
          </button>
        </div>
      )}
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </>
  );
}

export default CourseCard;
