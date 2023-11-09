import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { selectUser } from '../../../features/userSlice/userSlice'
import { Course } from '../../../features/tutorSlice/courseSlice'
import { UserBaseUrl } from '../../../Api'
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
import { RingLoader } from 'react-spinners';



function EnrolledCourses() {
  const user = useSelector(selectUser);
  const id = user?.user?._id;
  const [entrolledCourses, setEntrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
     
  
      axios
        .get(`${UserBaseUrl}/entrolled-courses/${id}`)
        .then((response) => {
          console.log(response.data,"response annu")
          setEntrolledCourses(response.data);
          setLoading(false); // Data is now available
        })
        .catch((error) => {
          console.error('Error fetching enrolled courses:', error);
          setLoading(false); // Handle the error and set loading to false
        });
    }
  }, [id]);

  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
  </div>
  }

  return (
    <div className="mt-5 ml-12 flex flex-col gap-8">
  <h1 className="text-3xl font-bold text-gray-800">Enrolled Courses</h1>
  {entrolledCourses && entrolledCourses.length > 0 ? (
   <div className="flex flex-wrap gap-4">
   {entrolledCourses.map((course) => (
     <div key={course?._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Card className="w-full max-w-[18rem] shadow-lg dark:bg-black dark:text-white">
            <CardHeader floated={false} color="blue-gray">
              <div style={{ width: "100%", height: "130px", overflow: "hidden" }}>
                <img
                  src={course?.courseId?.photo}
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
                  {course?.courseId?.courseName}
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
                  {course.courseId.rating}
                </Typography>
              </div>
              <Typography className="dark:bg-black dark:text-white">
                {course?.courseId?.coursedescription}
              </Typography>
              <Typography className="dark:bg-black dark-text-white text-lg font-semibold text-red-500">
                Rs: {course?.courseId?.courseFee} /-
              </Typography>
            </CardBody>
            <CardFooter className="pt-1">
              <Link to={`/entrolled_singlePage/${course._id}`} state={{ courseDetails: course }}>
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
      ) : (
        <p>No enrolled courses found.</p>
      )}
    </div>
  );
}

export default EnrolledCourses
