import React, { useEffect } from "react";
import mainlogo from "../../../assets/main-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { login, selectTutor } from "../../../features/tutorSlice/tutorSlice";
import { useState } from "react";
import { logout } from "../../../features/tutorSlice/tutorSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const tutor = useSelector(selectTutor);
  const dispatch = useDispatch();
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();

  const handleCourseClick = () => {
    setShowCourseDropdown(!showCourseDropdown);
    setShowMobileMenu(false);
  };

  const handleUserClick = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowMobileMenu(false);
  };
  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowCourseDropdown(false);
    setShowUserDropdown(false);
    navigate("/tutorLogin");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("tutorData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);

  return (
    <div>
      <nav className="bg-black text-white border-black dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to="/tutorHome" className="flex items-center">
              <img src={mainlogo} className="h-16 mr-3" alt="Main Logo" />
              <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                LEARNIFY
              </span>
            </Link>
          </div>

          {/* Hamburger menu button for mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleMobileMenuToggle}
              aria-expanded={showMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              showMobileMenu ? "block" : "hidden"
            }`}
            id="navbar-user"
          >
            <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 border border-bg-gray-800 rounded-lg bg-bg-gray-800 md:space-x-8 md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/tutorHome"
                  className="text-md font-semibold text-left text-white uppercase hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/my_courses"
                  className="text-md font-semibold text-left text-white uppercase hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my_students"
                  className="text-md font-semibold text-left text-white uppercase hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Students
                </Link>
              </li>
              <li>
                <Link
                  to="/channel"
                  className="text-md font-semibold text-left text-white uppercase hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Channel
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className={`text-md font-semibold text-left text-white uppercase md:p-0 dark:text-white ${
                    showCourseDropdown ? "hover:text-blue-700" : ""
                  }`}
                  onClick={handleCourseClick}
                >
                  Course
                </Link>
                {showCourseDropdown && (
                  <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
                    <li>
                      <Link
                        to="/Add_Course"
                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Create Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Add_Lesson"
                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Add Lesson
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
            {tutor ? (
              // Show user's name and handle click for dropdown
              <div className="relative z-20 flex items-center ml-5 ">
                <div className="ml-3">
                  <img
                    onClick={handleUserClick}
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                    src={
                      tutor.photo ||
                      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a9adeb42419075.57cc3f77ecae2.png"
                    }
                    alt="Bordered avatar"
                  />
                </div>
                <span className="cursor-pointer text-white dark:text-white ml-5">
                  {tutor.name}
                </span>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-32 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-black">
                    <div className="flex flex-col">
                      <Link
                        to="/tutorProfile"
                        type="button"
                        className="block w-full px-4 py-2 text-left text-black dark:bg-white dark:hover:text-white"
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 hover:text-red-800 dark:bg-white dark:hover:text-white"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="md:ml-12 space-x-2.5">
                <Link to="/tutorLogin">
                  <button
                    type="button"
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 dark:hover:bg-gray-700  dark:text-black dark:bg-white ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/tutorRegister">
                  <button
                    type="button"
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 dark:hover:bg-gray-700  dark:text-black dark:bg-white ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
