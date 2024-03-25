import axios from "axios";
import React, { useEffect, useState } from "react";
import { TutorBaseUrl } from "../../../Api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  title: string;
}

function AddLesson() {
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
      console.error("Error while Uploading Video:", error);
      toast.error("Error uploading Video: Please try again later");
    }
  };

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
    <div className="flex items-center justify-center ">
      <div className="mx-auto w-full max-w-[550px] bg-white p-12 rounded-3xl ">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Course Name
            </label>
            <select
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Title
            </label>
            <input
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Course Description
            </label>
            <input
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              type="text"
              value={description}
              onChange={(e) => setDescripton(e.target.value)}
            />
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Course Category
                </label>
                <select
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Course Duration
                </label>
                <input
                  onChange={(e) => setDuration(Number(e.target.value))}
                  type="number"
                  placeholder="Course Duration"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
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

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
}

export default AddLesson;
