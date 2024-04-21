import React, { useEffect, useState } from "react";
import axios from "axios";
import { TutorBaseUrl } from "../../../Api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageCropper from "../../common/ImageCropper";

interface Category {
  _id: string;
  title: string;
}

function Add_Courses() {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);

  const handleCropChange = (croppedImageUrl: any) => {
    console.log(croppedImageUrl,"crop")
    fetch(croppedImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const croppedImageFile = new File([blob], "cropped-image.png", { type: "image/png" });
        setCroppedImage(croppedImageFile);
      })
      .catch((error) => {
        console.error("Error fetching cropped image:", error);
      });
  };
  



  try {
    useEffect(() => {
      // Fetch categories from the server
      axios
        .get(`${TutorBaseUrl}/Allcategory`)
        .then((response) => {
          console.log(response, "GabefEWHF");
          setCategoryOptions(response.data.CourseDetails);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  } catch (error) {
    console.error("Error in component:", error);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseName) {
      toast.error("Please enter a course name");
      return;
    }

    if (price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!description) {
      toast.error("Please enter a description");
      return;
    }

    if (!duration) {
      toast.error("Please enter a duration");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

  

  
    try {

      if (!croppedImage) {
        toast.error("Please crop the image");
        return;
      }

      // Upload cropped image to Cloudinary
      const formData = new FormData();
      formData.append("file", croppedImage);
      formData.append("upload_preset", "Learnify_uploads");
      formData.append("cloud_name", "nithin7176");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/nithin7176/image/upload",
        formData
      );

      console.log("Cloudinary Response:", response);

      if (response.data && response.data.url) {
        // Cloudinary upload successful, continue with course creation
        const storedTutorData = localStorage.getItem("tutorData");

        if (storedTutorData) {
          const parsedUserData = JSON.parse(storedTutorData);
          await axios.post(`${TutorBaseUrl}/addCourse`, {
            courseName,
            coursedescription: description,
            courseduration: duration,
            photo: response.data.url, // Use the URL of the uploaded cropped image
            courseFee: price,
            tutor: parsedUserData._id,
            category: category,
          });

          toast.success("Course added successfully");
          setTimeout(() => {
            navigate("/my_courses");
          }, 2000);
        } else {
          console.error("Stored tutorData is null");
          toast.error("Error adding course");
        }
      } else {
        console.error("Invalid response from Cloudinary", response.data);
        toast.error("Error uploading image to Cloudinary");
      }
    } catch (error:any) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image: Please try again later");
      console.log("Cloudinary Error Response:", error.response);
    }
  };

    
    
  

  return (
    <div className="flex items-center justify-center ">
      <div className="mx-auto w-full max-w-[550px] bg-white p-12 rounded-3xl ">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Course Name"
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Course Price
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Description
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                  onChange={(e) => setDuration(e.target.value)}
                  type="number"
                  placeholder="Course Duration"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Course Image
            </label>
       

<ImageCropper onChange={handleCropChange} />
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
}

export default Add_Courses;
