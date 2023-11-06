import axios from "axios";
import React, { useState, useEffect } from "react";
import { UserBaseUrl } from "../../../Api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserDetails } from "../../../features/userSlice/userSlice";
import { ToastContainer, toast } from "react-toastify";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const id = user?.user?._id;

  // Populate the form data when the user data changes
  useEffect(() => {
    if (user && user.user) {
      setFormData({
        username: user.user.studentName,
        email: user.user.studentEmail,
        phone: user.user.phone,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidForm = () => {
    const { username, email, phone } = formData;

    // Basic validation for username (at least 5 characters)
    if (username.length < 5) {
      toast.error("Username must be at least 5 characters.");
      return false;
    }

    // Basic validation for email (you can add more complex email validation)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }

    // Basic validation for phone (exactly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }

    return true; // All validations passed
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm()) {
      return;
    }

    const updatedData = {
      studentName: formData.username,
      studentEmail: formData.email,
      phone: formData.phone,
    };

    axios
      .put(`${UserBaseUrl}/updateProfile/${id}`, updatedData)
      .then((response) => {
        console.log(response);

        if (response.data.user) {
          console.log(response.data.user);
          console.log('Profile updated successfully');

          // You can dispatch the updated user data to Redux here
          dispatch(updateUserDetails(response.data.user));

          onClose();
        } else {
          console.log("data not found");
        }
      })
      .catch((error: any) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div
      className={`${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } fixed top-0 left-0 w-full h-full flex items-center justify-center transform z-30 transition-transform duration-300 ease-in-out bg-black bg-opacity-50`}
    >
      <div className="bg-white p-6 rounded-lg w-2/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
