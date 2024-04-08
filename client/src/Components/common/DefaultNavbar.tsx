import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { selectTheme, setTheme } from "../../features/userSlice/themeSlice"

function DefaultNavbar() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <nav className="dark:text-white shadow-lg ">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/" 
            className="text-2xl font-bold text-black dark:text-white"
          >
            LEARNIFY
          </Link>
          </div>
        <div className="hidden md:flex items-center justify-center">
 
          <ul className="flex justify-center menu menu-horizontal font-semibold ml-5 items-center">
            <li>
              <Link to="/" className="mx-3 nav-link  ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/TutorView" className="mx-3 nav-link  ">
                Tutors
              </Link>
            </li>
            <li>
              <Link to="/courses" className="mx-3">
                Courses
              </Link>
            </li>
          
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center ml-4">
        
              <div className="flex">
                <Link to="/login" className="mx-2">
                  <button className="text-white bg-purple-500 border-2 border-purple-500 py-2 px-4 rounded-full focus:outline-none hover:bg-transparent hover:text-purple-500 transition duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-white bg-purple-500 border-2 border-purple-500 py-2 px-4 rounded-full focus:outline-none hover:bg-transparent hover:text-purple-500 transition duration-300">
                    Sign up
                  </button>
                </Link>
                <Link to="/tutorLogin" className="mx-2">
                  <button className="text-white bg-purple-500 border-2 border-purple-500 py-2 px-4 rounded-full focus:outline-none hover:bg-transparent hover:text-purple-500 transition duration-300">
                    Tutor Login
                  </button>
                </Link>
              </div>

            <ul className="flex items-center">
              <li>
                <label className="swap swap-rotate" onClick={handleThemeSwitch}>
                  {theme === "dark" ? (
                    <svg
                      className="text-white swap-off fill-current w-10 h-10 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  ) : (
                    <svg
                      className=" text-black swap-off fill-current w-10 h-10 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  )}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
   
    </nav>
  );
}

export default DefaultNavbar;


