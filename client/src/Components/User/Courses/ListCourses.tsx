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
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 dark:bg-black">
  {courses.map((course, index) => (
    <div key={index} className="flex flex-col">
      <Card className="flex-grow max-w-full shadow-lg bg-gray-100 dark:bg-black dark:text-white">
        <CardHeader floated={false} color="blue-gray">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={course.photo}
              alt="Course Thumbnail"
              className="object-cover w-full h-40"
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
              
            </svg>
          </IconButton>
        </CardHeader>
        <CardBody className="flex flex-col justify-between">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-medium dark:bg-black dark-text-white"
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
                
              </svg>
            
              {course.rating}
            </Typography>
          </div>
          <Typography className="dark:bg-black dark:text-white">
            {course.coursedescription}
          </Typography>
          <Typography className="dark:bg-black dark-text-white text-xl text-black font-bold font-serif">
           Rs: {course.courseFee} /-
          
          </Typography>
        </CardBody>
        <CardFooter className="pt-1">
          <Link to={`/singlePage/${course._id}`}>
            <Button
              size="lg"
              fullWidth={true}
              className="rounded-xl"
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
