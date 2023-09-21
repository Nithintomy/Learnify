import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTutor } from "../../../features/tutorSlice/tutorSlice";
import axios from "axios";
import { TutorBaseUrl } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface Category {
  _id: string;
  title: string;
}



function Add_course() {
  const dispatch = useDispatch();

  const Tutor = useSelector(selectTutor);
  const navigate =useNavigate()

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  const [photo, setPhoto] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPhoto(file);
    } else {
      // No file selected
      setPhoto(null);
    }
  };




  const handlePhotoUpload = async () => {
    try {
      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append('upload_preset', 'Learnify_uploads');
        formData.append('cloud_name', 'nithin7176');
  
        console.log('Before axios.post');
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/nithin7176/image/upload",
          formData
        );
        console.log('After axios.post');
        console.log(response, "response");
  
        if (response.data && response.data.url) {
          console.log("Image uploaded successfully. URL:", response.data.url);
          setCloudanaryURL(response.data.url);
        } else {
          console.error("Invalid response from Cloudinary", response.data);
          toast.error("Error uploading image: Invalid response from Cloudinary");
        }
      } else {
        toast.error("No image selected");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
    }
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

    await handlePhotoUpload();

    if (!cloudanaryURL) {
      toast.error("Error while Uploading Image");
      return;
    }
    const storedTutorData = localStorage.getItem("tutorData");

    if (storedTutorData) {
      const parsedUserData = JSON.parse(storedTutorData);
      console.log(parsedUserData, "tutorData");
       console.log("Before Axios call")
      axios.post(`${TutorBaseUrl}/addCourse`, {
        
        courseName,
        coursedescription: description,
        courseduration: duration,
        photo: cloudanaryURL,
        courseFee: price,
        tutor: parsedUserData._id,
      }).then((response) => {
        console.log(response.data);
        toast.success('Course added successfully');
        setTimeout(() => {
          navigate('/my_courses')
        }, 2000);
     
        
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding course');
      });
    } else {
     
      console.error("Stored tutorData is null");
    }
  }
  


  
  

  return (
    <div className="w-full">
      <ToastContainer />
      <form
       className="bg-white shadow-md rounded mb-4"
       onSubmit={handleSubmit} 
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Course Name"
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Duration
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            placeholder="Duration"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-7">
            Description
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          onChange={(e)=>setDescription(e.target.value)}
          />
          
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-7">
            Category
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
          <label className="block text-gray-700 text-sm font-bold mb-7">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            onChange={handleFileChange}
          />
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Course"
              style={{ height: "100px", width: "100px" }}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}


export default Add_course




