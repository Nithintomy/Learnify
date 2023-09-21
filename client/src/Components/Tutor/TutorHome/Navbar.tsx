import React, { useEffect } from "react";
import mainlogo from "../../../assets/main-logo.jpg";
import { useSelector ,useDispatch,} from "react-redux";
import { login, selectTutor } from "../../../features/tutorSlice/tutorSlice";
import {useState} from 'react'
import {logout} from "../../../features/tutorSlice/tutorSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Navbar() {
  const tutor = useSelector(selectTutor);
  console.log(tutor, "tutor vanuu")
  const dispatch = useDispatch();
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate =useNavigate()

  const handleCourseClick = () => {
    setShowCourseDropdown(!showCourseDropdown);
  };

  const handleUserClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  
  
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Hide both dropdowns
    setShowCourseDropdown(false);
    setShowUserDropdown(false);
    navigate('/tutorLogin')
  };
  
  useEffect(() => {
    const storedUserData = localStorage.getItem("tutorData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData,"tutorData")
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);
  
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="" className="flex items-center">
            <img src={mainlogo} className="h-16 mr-3" />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              LEARNIFY
            </span>
          </Link>

          <div className="flex items-center md:order-2">
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/tutorHome"
                  className="text-md font-semibold  text-left text-black uppercase  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my_courses" className="text-md font-semibold  text-left text-black uppercase  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">
                  My Courses
                </Link>
              </li>
              <li>
                <Link to="/my_students" className="text-md font-semibold  text-left text-black uppercase  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">
                  Students
                </Link>
              </li>
              <li>
                <Link to="/channel" className="text-md font-semibold  text-left text-black uppercase  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">
                  Channel
                </Link>
              </li>
              <li>
              <Link
                to=""
                className={`text-md font-semibold text-left text-black uppercase hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent ${
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
              <div className="relative ml-4">
                <span
                  className="cursor-pointer text-gray-800 dark:text-white"
                  onClick={handleUserClick}
                >
                  {tutor.name}
                </span>
                {showUserDropdown && (
                  <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 hover:text-red-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )  : (
              <div className="md:ml-20 space-x-2.5">
                
               
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
