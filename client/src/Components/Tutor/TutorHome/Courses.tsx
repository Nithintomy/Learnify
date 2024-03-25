import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TutorBaseUrl } from "../../../Api";
import { RingLoader } from 'react-spinners';
import Breadcrumbs from "../../common/Breadcrumbs";



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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<CourseResponse>(`${TutorBaseUrl}/courses/${tutor_id}`)
      .then((response) => {
        console.log("Courses data:", response.data);
        setCourses(response.data.AllCourses);
        setLoading(false);
      
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, []);
  if (loading) {
    return <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
  </div>
  }

  return (
    <div>
    <Breadcrumbs  /> 
    <div className="flex flex-wrap h-full ">
     
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course, _) => (
          <Card className="m-6 w-96" key={course._id}>
            <CardHeader color="blue-gray" className="relative h-56">
              <img src={`${course.photo}`} 
              alt="card-image"
              style={{ width: "200vh", height: "250px" }}
              />
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
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
    </div>
  );
}

export default Courses;
