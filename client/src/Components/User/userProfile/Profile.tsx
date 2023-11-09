import React, { useEffect, useState } from 'react';
import EditProfileModal from './EditProfile';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { UserBaseUrl } from '../../../Api';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage,selectUser  } from "../../../features/userSlice/userSlice";



function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(localStorage.getItem("profileImageUrl") || null);
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
    <>
    <ToastContainer/>
      <div className="w-full max-w-2xl mx-auto mt-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-black">
          
          <div className="flex flex-col items-center p-6">
            {user ? (
             <img
             className="w-24 h-24 mb-3 rounded-full shadow-lg"
             src={imageUrl || user?.user?.photo} 
             alt=""
           />
              
            ) : (
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a9adeb42419075.57cc3f77ecae2.png"
                alt=""
              />
            )}
          
           
           
            <span className="text-sm text-black dark:text-gray-400">
            {user?.studentName || user?.user?.studentName}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.phone || user?.user?.phone}
            </span>

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label>
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

          <div className="p-4 space-y-4">
            <div className="flex items-center">
              <label className="block flex-1 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="w-2/3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user?.phone || user?.user?.phone}
              />
            </div>
            {/* Add more fields here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
