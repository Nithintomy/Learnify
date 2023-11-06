import React from "react";
import mainlogo from "../../../assets/main-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/userSlice/userSlice";
import { useState, useEffect } from "react";
import { login, logout } from "../../../features/userSlice/userSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectCartCount } from "../../../features/userSlice/cartSlice";



function Navbar() {
  const user = useSelector(selectUser);
  const count =useSelector(selectCartCount)
  console.log(user, "user vanuu");
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  const nav = useNavigate();

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    nav("/login");
    // Hide the dropdown
    setShowDropdown(false);
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src={mainlogo}
              className="h-16 mr-3 dark:bg-black"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white dark:bg-black">
              LEARNIFY
            </span>
          </a>

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
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-black">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/TutorView"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Courses
                </Link>
              </li>
              {/* <li>
                <Link
                  to=""
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Community
                </Link>
              </li> */}
              <li>
                <Link
                  to="/enrolled-courses"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Enrolled Courses
                </Link>
              </li>
            </ul>

            {user ? (
              <>
              <li className="ml-4 " style={{ listStyle: 'none' }}>
               <Link to='/cart'>
               <IconButton >
                  <ShoppingCartIcon className={theme === 'dark' ? 'text-white' : ''} />
                  <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {count}
                  </span>
                </IconButton>
               </Link>

              </li>

                <div className="relative z-20 ml-10 mr-10 mb-5">
                  <span className="ml-5">
                    <img
                      onClick={handleUserClick}
                      className="w-10  h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                      src={
                        user?.user?.photo ||
                        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a9adeb42419075.57cc3f77ecae2.png"
                      }
                      alt="Bordered avatar"
                    />
                  </span>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-black">
                      <Link
                        to="/userProfile"
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
                  )}
                </div>
                </>
            ) : (
              <div className="md:ml-12 space-x-2.5">
                <Link to="/login">
                  <button
                    type="button"
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 dark:hover:bg-gray-700  dark:text-black dark:bg-white ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 dark:hover:bg-gray-700  dark:text-black dark:bg-white ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Sign up
                  </button>
                </Link>
                <Link to="/tutorLogin">
                  <button
                    type="button"
                    className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase  dark:hover:bg-gray-700  dark:text-black dark:bg-white leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                  >
                    Tutor Login
                  </button>
                </Link>
              </div>
            )}
            <ul>
              <li>
                <label className="swap swap-rotate">
                  {theme === "dark" ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 inline-flex items-center 
                      rounded-full bg-neutral-800 px-1 pb-2 pt-2.5 text-xs font-medium uppercase  leading-normal dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={handleThemeSwitch}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="mr-2 ml-2">Light</span>
                      <svg
                        className="swap-off fill-current w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 inline-flex items-center rounded-full bg-neutral-800 px-1 pb-2 pt-2.5 text-xs font-medium uppercase dark:bg-white leading-normal dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={handleThemeSwitch}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="mr-2 ml-2">Dark</span>
                      <svg
                        className="swap-off fill-current w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    </button>
                  )}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
