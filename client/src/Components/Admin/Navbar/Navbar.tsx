import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ProfileMenu from "../AdminNavbar/ProfileMenu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

function NavList() {
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const handleCourseClick = () => {
    setShowCourseDropdown(!showCourseDropdown);
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-4 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-md text-black uppercase font-bold mr-6"
      >
        <Link to="/dashboard" className="flex items-center hover:text-blue-500 transition-colors">
          Dashboard
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-md text-black uppercase font-bold mr-6 "
      >
        <Link to="/admin_studentList" className="flex items-center hover:text-blue-500 transition-colors">
          Users
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-md text-black uppercase font-bold mr-6 "
      >
        <Link to="/admin_tutorList" className="flex items-center hover:text-blue-500 transition-colors">
          Tutors
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-md text-black uppercase font-bold mr-6"
      >
        <Link to="/CourseViews" className="flex items-center hover:text-blue-500 transition-colors">
          Courses
        </Link>
      </Typography>
      <li>
        <Link
          to=""
          className={`text-md font-bold text-left z-30 text-black uppercase hover:bg-gray-700 md:hover:bg-transparent md:p-0`}
          onClick={handleCourseClick}
        >
          Category <ArrowDropDownIcon/>
        </Link>
        {showCourseDropdown && (
          <ul className="absolute z-30 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
            <li>
              <Link
                to="/admincategory"
                className="block w-full px-4 py-2 z-30 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Category Table
              </Link>
            </li>
            <li>
              <Link
                to="/addCategory"
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Add Category
              </Link>
            </li>
          </ul>
        )}
      </li>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-md text-black uppercase font-bold mr-6 "
      >
        <Link to="/Orders" className="flex items-center hover:text-blue-500 transition-colors">
          Orders
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium text-xl text-white"
      >
        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <ProfileMenu />
      </Typography>
    </ul>
  );
}

export function AdminNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto px-2 py-1 w-full shadow-gray-800 bg-gray-400">
      <div className="flex items-center justify-between text-blue-gray-900 w-full mx-auto px-4">
        <Typography
          as="a"
          
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-xl font-bold text-black"
        >
         <Link to={"/dashboard"}>
         LEARNIFY
         </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-10 w-10 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-white" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
