import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TutorBaseUrl } from "../../../Api";

interface Course {
  _id: string;
  courseName: string;
  coursedescription: string;
  courseFee: number;
  courseduration: number;
  photo: string;
  tutor: string;
  tutorName: string;
  //  other properties here if needed
}

interface CourseResponse {
  AllCourses: Course[];
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const tutor = localStorage.getItem("tutorData");
  const tutor_Details = tutor ? JSON.parse(tutor) : null;
  const tutor_id = tutor_Details ? tutor_Details._id : null;

  useEffect(() => {
    axios
      .get<CourseResponse>(`${TutorBaseUrl}/courses/${tutor_id}`)
      .then((response) => {
        console.log("Courses data:", response.data);
        setCourses(response.data.AllCourses);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-wrap">
      <ToastContainer />
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course, index) => (
          <Card className="mt-6 w-96" key={course._id}>
            <CardHeader color="blue-gray" className="relative h-56">
              <img src={`${course.photo}`} alt="card-image" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {course.courseName}
              </Typography>
              <Typography>{course.coursedescription}</Typography>
            </CardBody>
            <Typography>
              <span className="font-bold m-6">Duration: {course.courseduration} hrs</span>
            </Typography>
            <CardFooter className="pt-0">
              <Link to={`/singleView/${course._id}`}>
                <Button>Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default Courses;
