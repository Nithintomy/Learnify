import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/userSlice/userSlice";
import { selectUser } from "../../../features/userSlice/userSlice";
import Footers from "../../../Components/User/Footer/Footers";
import TutorBanner from "../../../Components/User/Banners/TutorBanner";
import Navbars from "../../../Components/User/Navbar/Navbars";
import Hero from "../../../Components/User/HomeMain/Hero";
import TrustedCompanies from "../../../Components/User/Banners/TrustedCompanies";
import OurCourses from "../../../Components/User/Banners/OurCourses";
import CourseCard from "../../../Components/User/Card/CourseCard";

function Homepage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userName = user?.user?.studentName;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);

  return (
    <div className="dark:bg-black bg-base-200 overflow-x-hidden">
      <Navbars />
      <div className="container mx-auto px-4 lg:px-0">
        <Hero />
      </div>
      <TrustedCompanies />
      <div className="flex  dark:text-white dark:bg-black bg-gray-200 py-5 mx-10">
        <h2 className="dark:text-white dark:bg-black font-bold text-gray-800 mb-4 pb-2 text-3xl font-bitter">
          Let's start learning,
          <span className="text-black text-3xl font-bold font-bitter ml-4 dark:text-white">{userName}</span>
        </h2>
      </div>

      <div className="container mx-auto px-4 lg:px-0">
        <CourseCard />
      </div>

      <hr className="m-6 border-t-2 border-gray-300 shadow-md dark:border-gray-700" />

      <OurCourses />

      <hr className="m-6 border-t-2 border-gray-300 shadow-md dark:border-gray-700" />

      <TutorBanner />

      <Footers />
    </div>
  );
}

export default Homepage;
