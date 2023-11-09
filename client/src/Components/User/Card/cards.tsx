import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import { Course } from "../../../features/tutorSlice/courseSlice";
import { Link } from "react-router-dom";
import { RingLoader } from 'react-spinners';

export function CourseCard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allCourses`)
      .then((response) => {
        console.log(response.data.allcourse);
        setCourses(response.data.allcourse);
        setLoading(false)
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
  </div>
  }

  return (
    <div className="mt-5 flex flex-wrap gap-8">
      <ToastContainer />
      {courses.map((course, index) => (
        <Card
          key={index}
          className="w-full md:max-w-[18rem]  shadow-lg   dark:bg-black  dark:text-white "
        >
          <CardHeader floated={false} color="blue-gray">
            <img
              src={course.photo}
              alt="Course Thumbnail"
              className="w-full h-48 object-cover"
            />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            <IconButton
              size="sm"
              color="red"
              variant="text"
              className="!absolute top-4 right-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                {/* Your SVG path here */}
              </svg>
            </IconButton>
          </CardHeader>
          <CardBody>
            <div className="mb-1 flex items-center justify-between dark:bg-black dark:text-white">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium dark:bg-black dark:text-white"
              >
                {course.courseName}
              </Typography>
              <Typography
                color="blue-gray"
                className="flex items-center gap-1.5 font-normal -mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-0.5 h-5 w-5 text-yellow-700"
                >
                  {/* Your SVG path here */}
                </svg>
                {course.rating}
              </Typography>
            </div>
            <Typography className="dark:bg-black dark:text-white">
              {course.coursedescription}
            </Typography>

            <Typography className="dark:bg-black dark:text-white text-lg font-semibold text-red-500">
              Rs: {course.courseFee} /-
            </Typography>
          </CardBody>
          <CardFooter className="pt-1">
            <Link to={`/singlePage/${course._id}`}>
              <Button
                size="lg"
                fullWidth={true}
                style={{ cursor: "pointer" }}
              >
                View Course
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
