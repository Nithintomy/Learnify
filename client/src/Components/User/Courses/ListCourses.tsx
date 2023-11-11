import React from "react";
import { Course } from "../../../features/tutorSlice/courseSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface CoursesByCategoryListProps {
  courses: Course[];
}

export function CoursesByCategoryList({ courses }: CoursesByCategoryListProps) {
  return (
    <div className="mt-5 ml-12 flex flex-wrap gap-8 dark:bg-black">
      {courses.map((course, index) => (
        <div key={index}>
          <Card className="w-full max-w-[18rem] shadow-lg dark:bg-black dark:text-white">
            <CardHeader floated={false} color="blue-gray">
              <div style={{ width: "100%", height: "130px", overflow: "hidden" }}>
                <img
                  src={course.photo}
                  alt="Course Thumbnail"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
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
                  className="font-medium dark-bg-black dark-text-white"
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
              <Typography className="dark:bg-black dark-text-white text-lg font-semibold text-red-500">
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
        </div>
      ))}
    </div>
  );
}
