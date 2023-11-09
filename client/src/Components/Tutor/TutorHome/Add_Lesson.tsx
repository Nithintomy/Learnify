import axios from "axios";
import React, { useEffect, useState } from "react";
import { TutorBaseUrl } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  title: string;
}

function Add_Lesson() {
  const [courseName, setCourseName] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescripton] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [courseOptions, setCourseOptions] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [cloudanaryURL, setCloudanaryURL] = useState("");
  const nav = useNavigate();

  const storedTutorData = localStorage.getItem("tutorData");

  const TutorData = storedTutorData ? JSON.parse(storedTutorData) : null;

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  console.log(TutorData, "tuanffn");
  useEffect(() => {
    axios
      .get(`${TutorBaseUrl}/Allcategory`)
      .then((response) => {
        console.log(response, "GabefEWHF");
        setCategoryOptions(response.data.CourseDetails);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // get all courses from server

    axios
      .get(`${TutorBaseUrl}/courses/${TutorData?._id}`)
      .then((response) => {
        console.log(response.data);
        setCourseOptions(response.data.AllCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlevideoUpload = async () => {
    try {
      if (video) {
        const formData = new FormData();
        formData.append("file", video);
        formData.append("upload_preset", "Learnify_uploads");
        formData.append("cloud_name", "nithin7176");

        console.log("Before axios.post");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/nithin7176/video/upload",
          formData
        );
        console.log("After axios.post");
        console.log(response, "response");

        if (response.data && response.data.url) {
          console.log("Video uploaded successfully. URL:", response.data.url);
          setCloudanaryURL(response.data.url);
        } else {
          console.error("Invalid response from Cloudinary", response.data);
          toast.error(
            "Error uploading image: Invalid response from Cloudinary"
          );
        }
      } else {
        toast.error("No image selected");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
    }
  };

  console.log(cloudanaryURL, "myr");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !courseName ||
      !title ||
      !duration ||
      !description ||
      !category ||
      !video
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (title.length < 3 || title.length > 40) {
      toast.error("Title must be between 3 and 20 characters.");
      return;
    }

    if (description.split(/\s+/).length > 120) {
      toast.error("Course description must be 120 words or less.");
      return;
    }

    // video upload to cloudanary

    await handlevideoUpload();

    if (!cloudanaryURL) {
      toast.error("Error occur While Uploading the Video");
      return;
    }

    // send the Lesson data to server

    axios
      .post(`${TutorBaseUrl}/addLessons`, {
        courseName,
        title,
        duration,
        description,
        category,
        tutor: TutorData._id,
        video: cloudanaryURL,
      })
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          toast.success("Lesson Added Successfully");
          nav("/my_courses");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error Occured While Adding");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen ">
    <div className="bg-white shadow-md p-8 mt-8 w-full max-w-md rounded-lg">
      <ToastContainer />
      <form
        className="bg-white rounded p-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <select
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          >
            <option>Select Course</option>
            {courseOptions.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Duration
          </label>
          <input
            type="number"
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
           
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Description
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="text"
            value={description}
            onChange={(e) => setDescripton(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categoryOptions.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Video
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="file"
            accept="video/*"
            onChange={handleVideo}
          />
          {video && (
            <video
              controls
              src={URL.createObjectURL(video)}
              style={{ width: "100%" }}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline border rounded bg-black"
            type="submit"
          >
            Add Lesson
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Add_Lesson;
