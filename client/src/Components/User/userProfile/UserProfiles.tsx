import React, { useEffect, useState } from 'react';
import EditProfileModal from './EditProfile';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { UserBaseUrl } from '../../../Api';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage,selectUser  } from "../../../features/userSlice/userSlice";

const AboutSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(localStorage.getItem("userProfileImageUrl") || null);
    const [imageFile, setImageFile] = useState<File | null>(null);
  

  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  const id=user?.user?._id
  
  

  useEffect(() => {
    // Save the image URL to localStorage whenever it changes
    if (imageUrl) {
      localStorage.setItem('profileImageUrl', imageUrl);
    } else {
      // Remove the item from localStorage if imageUrl is null
      localStorage.removeItem('profileImageUrl');
    }
  }, [imageUrl]);




  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
  
    if (selectedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
  
      if (allowedFormats.includes(selectedFile.type)) {
        setImageFile(selectedFile);
      } else {
        toast.error("Only image formats (JPEG, PNG, GIF) are allowed.");
      }
    }
  };

  const submitImage = () => {
    if (imageFile) {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', 'Learnify_uploads');
      data.append('cloud_name', 'nithin7176');

      fetch('https://api.cloudinary.com/v1_1/nithin7176/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);

          if (data.url) {
            console.log(localStorage.getItem('token'),"token");
            axios.put(`${UserBaseUrl}/studentProfile/${id}`, { image: data.url })
            .then((res)=> {
              console.log(res.data, "hehehe")
            }).catch((err)=> {
              console.log(err)
            })
            setImageUrl(data.url);
            dispatch(updateProfileImage(data.url));
            toast.success("Profile Updated Successfully")
          } else {
            console.error('No Image URL Found');
          }
        })
        .catch((err) => {
          console.error('Fetch error:', err);
        });
    } else {
      console.error('No image selected');
    }
  };

  console.log(user,"mdsamds")

  return (
  <div className="relative flex flex-col lg:flex-row justify-center rounded-3xl bg-white overflow-hidden mr-10">
  <div className="max-w-full lg:max-w-7xl mx-auto lg:w-1/2">
    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
        fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100"></polygon>
      </svg>

      <div className="pt-1"></div>

      <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20">
        <div className="sm:text-center lg:text-left">
          <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            About me
          </h2>

          <span className="text-2xl font-bitter text-black dark:text-gray-400">
            {user?.studentName || user?.user?.studentName}
          </span>
          
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center">
            <label className="block flex-1 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full lg:w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user?.studentName || user?.user?.studentName}
            />
          </div>

          <div className="flex items-center">
            <label className="block flex-1 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full lg:w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user?.studentEmail || user?.user?.studentEmail} 
            />
          </div>

          <div className="flex items-center">
            <label className="block flex-1 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              type="text"
              id="address"
              className="w-full lg:w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user?.phone || user?.user?.phone}
            />
          </div>

          <div className="flex justify-center lg:justify-start space-x-3 md:mt-6">
            <button
              className="btn btn-active btn-accent text-sm font-medium text-white rounded-md"
              onClick={() => {
                openEditModal();
              }}
            >
              Edit Profile
            </button>
            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
            />
            <label className='mt-2'>
              <input
                type="file"
                className=""
                onChange={handleImageUpload}
              />
              <button
                onClick={submitImage}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Upload
              </button>
            </label>
          </div>
        </div>
      </main>
    </div>
    
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/2 flex justify-center items-center">
      {user ? (
        <img className="w-56 object-cover object-top sm:h-72 md:h-96 lg:w-full" 
          src={imageUrl || user?.user?.photo}  alt="" />
        ) : (
        <img
          className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg"
          alt=""
        />
      )}
    </div>
  </div>
  <Toaster position="top-right" containerClassName="p-8 m-8" />
</div>

  );
};

export default AboutSection;
