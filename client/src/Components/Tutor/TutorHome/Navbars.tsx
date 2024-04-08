import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tutorLogin, selectTutor } from "../../../features/tutorSlice/tutorSlice";
import { useState } from "react";
import { logout } from "../../../features/tutorSlice/tutorSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbars() {
  const tutor = useSelector(selectTutor);
  const dispatch = useDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(localStorage.getItem("profileImageUrl") || null);

  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/tutorLogin");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("tutorData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(tutorLogin(parsedUserData));
    }
  }, [dispatch]);


  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('profileImageUrl', imageUrl); 
    } else {
      localStorage.removeItem('profileImageUrl'); 
    }
  }, [imageUrl, setImageUrl]); 
  

  return (
    <div className="navbar flex justify-between relative">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold ml-14  dark:text-white"
        >
          LEARNIFY
        </Link>
      </div>
      
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
          <Link to="/tutor_dashboard">
            <li>
              <a className="nav-link text-md font-semibold">Home</a>
            </li>
          </Link>
          <Link to="/my_courses">
            <li>
              <a className="nav-link text-md font-semibold"> My Courses</a>
            </li>
          </Link>
          <Link to="/my_students">
            <li>
              <a className="nav-link text-md font-semibold">Students</a>
            </li>
          </Link>

          <li>
            <details>
              <summary
                className="nav-link text-md font-semibold"
                style={{ whiteSpace: "nowrap" }}
              >
                Course
              </summary>
              <ul className="bg-base-100 rounded-t-none absolute top-full left-0 z-50 ">
                <li>
                <Link
                        to="/Add_Course"
                        className="nav-link w-32 text-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Create Course
                      </Link>
                </li>
                <li>
                <Link
                        to="/Add_Lesson"
                        className="nav-link text-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Add Lesson
                      </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>

        {tutor ? (
          <div className="flex navbar-end dark:text-white relative">
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

            <div className="dropdown dropdown-end navbar-end absolute lg:relative top-full lg:top-auto lg:right-auto">
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
                  {tutor ? (
                    <img className="w-56 object-cover object-top sm:h-72 md:h-96 lg:w-full" 
                      src={imageUrl || tutor.photo}  alt="" />
                  ) : (
                    <img
                      className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
                      src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg"
                      alt=""
                    />
                  )}
                </div>
              </div>
              

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 lg:mt-0 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  to="/tutorProfile"
                  type="button"
                  className="block w-full px-4 py-2 text-left text-black dark:bg-black dark:hover:text-black"
                >
                  Profile
                </Link>

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
            <Link to="/tutorLogin">
              <button className="text-black bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Login
              </button>
            </Link>
            <Link to="/tutorRegister">
              <button className="text-black bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbars;
