import axios from "axios";
import React, { useState } from "react";
import { TutorBaseUrl } from "../../../Api";
import { useDispatch, useSelector } from "react-redux";
import { selectTutor ,updateTutorDetails} from "../../../features/tutorSlice/tutorSlice";


interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditTutorProfile({ isOpen, onClose }: EditProfileModalProps) {
  
  const [formData, setFormData] = useState({
    tutorName: "",
    tutorEmail: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const tutor = useSelector(selectTutor);
  const id = tutor?._id;

  console.log("id",id)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      tutorName: formData.tutorName,
      tutorEmail: formData.tutorEmail,
      phone: formData.phone,
    };


    axios

      .put(`${TutorBaseUrl}/updateTutorProfile/${id}`, updatedData)
      .then((response) => {
        console.log("resssssssssssssssssssssssssponse")
        if (response.status === 200) {
          console.log("response .staue .................")

          console.log(response,"reeeeeeeeeeeeeeeeeeeeeee")
          dispatch(updateTutorDetails(response.data.tutor));
          onClose();
  
        } else {
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
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="tutorName"
              name="tutorName"
              value={formData.tutorName}
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
              id="tutorEmail"
              name="tutorEmail"
              value={formData.tutorEmail}
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

          {/* Add more form fields here */}
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




export default EditTutorProfile
