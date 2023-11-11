import React from "react";
import { useEffect } from "react";
import Carousel from "../../../Components/User/Carousel/Carousel";
import Navbar from "../../../Components/User/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/tutorSlice/tutorSlice";
import { selectUser } from "../../../features/userSlice/userSlice";

import Footer from "../../../Components/User/Footer/Footer";
import { CourseCard } from "../../../Components/User/Card/cards";
import TutorViewBanner from "../../../Components/User/Banners/tutorviewBanner";

function Homepage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user, "userrrrr");
  const userName = user?.user?.studentName;
  console.log(userName, "namem");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);

  return (
    <div className=" dark:bg-black">
      <Navbar />
      <div className="mt-24 lg:px-0">
        <Carousel />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white ml-24 m-14">
        Let's start learning,
        <span className="text-black text-3xl font-bold ml-4 dark:text-white">{userName}</span>
      </h1>

      <div className="px-3 lg:px-3 ml-8">
        <CourseCard />
      </div>
      <hr className="my-8 border-t-2 border-gray-300 dark:border-gray-700" />

      <TutorViewBanner />
      <hr className="my-8 border-t-2 border-gray-300 dark:border-gray-700" />

      <Footer />
    </div>
  );
}

export default Homepage;
