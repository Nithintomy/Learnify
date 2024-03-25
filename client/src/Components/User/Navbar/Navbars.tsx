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
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="navbar flex justify-between">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold ml-14  dark:text-white"
        >
          LEARNIFY
        </Link>
      </div>
      {/* Hamburger menu button for mobile */}
      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        className={`items-center w-full md:flex  md:order-1 ${
          showMobileMenu ? "block" : "hidden"
        }`}
        id="navbar-user"
      >
        <ul className="menu menu-horizontal px-1 text-sm flex justify-center dark:text-white">
          <Link to="/">
            <li>
              <a className="nav-link text-md font-semibold">Home</a>
            </li>
          </Link>
          <Link to="/TutorView">
            <li>
              <a className="nav-link text-md font-semibold">Tutors</a>
            </li>
          </Link>
          <Link to="/courses">
            <li>
              <a className="nav-link text-md font-semibold">Courses</a>
            </li>
          </Link>
          {user.user && (
            <Link to="/enrolled-courses">
              <li>
                <a className="nav-link text-md font-semibold">
                  Enrolled Courses
                </a>
              </li>
            </Link>
          )}
        </ul>

        {user.user ? (
          <div className="navbar-end dark:text-white relative">
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
            <Link to="/cart">
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
                  <span className="badge badge-sm indicator-item">{count}</span>
                </div>
              </button>
            </Link>
            <div className="dropdown dropdown-end navbar-end absolute lg:relative z-50 top-full lg:top-auto lg:right-auto">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
              </div>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
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
                className="menu menu-sm dropdown-content mt-3 lg:mt-0 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  to="/userProfile"
                  type="button"
                  className="block w-full px-4 py-2 text-left text-black dark:bg-black dark:hover:text-black"
                >
                  Profile
                </Link>
                <li>
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
          <div className="flex navbar-end">
            <Link to="/login">
              <button className="text-black bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="text-black bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Sign up
              </button>
            </Link>
            <Link to="/tutorLogin">
              <button className="text-black bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Tutor Login
              </button>
            </Link>
          </div>
        )}
        <ul>
          <li>
            <label className="swap swap-rotate">
              {theme === "dark" ? (
                <svg
                  onClick={handleThemeSwitch}
                  style={{ cursor: "pointer" }}
                  className="text-white swap-off fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              ) : (
                <svg
                  onClick={handleThemeSwitch}
                  style={{ cursor: "pointer" }}
                  className=" text-black swap-off fill-current w-10 h-10"
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
  );
}

export default Navbars;
