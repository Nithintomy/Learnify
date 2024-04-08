import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/userSlice/userSlice";
import { useState, useEffect } from "react";
import { login, logout } from "../../../features/userSlice/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectCartCount } from "../../../features/userSlice/cartSlice";
import { selectTheme, setTheme } from "../../../features/userSlice/themeSlice";

function Navbars() {
  const user = useSelector(selectUser);
  const count = useSelector(selectCartCount);
  const theme = useSelector(selectTheme);
  console.log(user, "user vanuu");
  const dispatch = useDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const nav = useNavigate();

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    nav("/login");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData, "userData");
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);

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
    <nav className="dark:text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-black dark:text-white"
          >
            LEARNIFY
          </Link>
          <div className="md:hidden ml-60">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              onClick={handleMobileMenuToggle}
              aria-expanded={showMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
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
            {user.user && (
              <li>
                <Link to="/enrolled-courses" className="mx-3">
                  Enrolled Courses
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center ml-4">
            
            {user.user ? (
              <div className="flex items-center ml-4">
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
                <Link to="/cart" className="mx-2">
                  <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item">
                        {count}
                      </span>
                    </div>
                  </button>
                </Link>
                <div className="dropdown dropdown-end absolute lg:relative z-50 top-full lg:top-auto lg:right-auto">
                 

                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost mx-2 btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          user?.user?.photo ||
                          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 dark:bg-white dark:text-white lg:mt-0 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <Link
                      to="/userProfile"
                      type="button"
                      className="block w-full px-4 py-2 text-left text-black"
                    >
                      Profile
                    </Link>
                    <li  className="block w-full  py-2 text-left text-black">
                      <a>Settings</a>
                    </li>
                    <li>
                      <a className="text-red-500" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
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
            )}
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
      {showMobileMenu && (
        <div className="md:hidden">
          <ul className="flex flex-col mt-4">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/TutorView"
                className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
              >
                Tutors
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
              >
                Courses
              </Link>
            </li>
            {user.user && (
              <li>
                <Link
                  to="/enrolled-courses"
                  className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
                >
                  Enrolled Courses
                </Link>
              </li>
            )}
            {user.user ? (
              <>
                <li className="border-t border-gray-200 dark:border-gray-600">
                  <Link
                    to="/userProfile"
                    className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="border-t border-gray-200 dark:border-gray-600">
                <Link
                  to="/login"
                  className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
                >
                  Sign up
                </Link>
                <Link
                  to="/tutorLogin"
                  className="block py-2 px-4 text-sm hover:bg-white dark:hover:bg-gray-700"
                >
                  Tutor Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbars;
