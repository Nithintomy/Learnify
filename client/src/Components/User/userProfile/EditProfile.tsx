import React, { useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose(); // Close the modal after submitting
  };

  return (
    <div
      className={`${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
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
            <label htmlFor="address" className="block text-sm font-medium">
              Phone
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
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

export default EditProfileModal;
