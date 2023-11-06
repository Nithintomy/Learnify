import React, { useEffect, useState } from 'react';
import { EditedCourse, Course } from '../../../features/tutorSlice/courseSlice';
import { toast } from 'react-toastify'; // Import react-toastify

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseDetails: Course | null;
  onSave: (editedCourse: EditedCourse) => void;
}

function EditCourseModal({
  isOpen,
  onClose,
  courseDetails,
  onSave,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState({
    courseName: '',
    coursedescription: '',
    courseFee: 0,
    courseduration: 0,
    photo: '',
  });

  // Populate the form data with the current course details when the modal opens
  useEffect(() => {
    if (isOpen && courseDetails) {
      setFormData({
        courseName: courseDetails.courseName,
        coursedescription: courseDetails.coursedescription,
        courseFee: courseDetails.courseFee,
        courseduration: courseDetails.courseduration,
        photo: courseDetails.photo,
      });
    }
  }, [isOpen, courseDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form validation
    if (formData.courseName.trim() === '') {
      toast.error('Course Name is required');
      return;
    }

    if (formData.coursedescription.trim() === '') {
      toast.error('Course Description is required');
      return;
    }

    if (formData.courseFee <= 0) {
      toast.error('Course Fee must be greater than 0');
      return;
    }

    if (formData.courseduration <= 0) {
      toast.error('Course Duration must be greater than 0');
      return;
    }

    const editedCourse: EditedCourse = {
      _id: courseDetails?._id || '',
      courseName: formData.courseName,
      coursedescription: formData.coursedescription,
      courseFee: formData.courseFee,
      courseduration: formData.courseduration,
      photo: formData.photo,
      lessons: [],
    };
    onSave(editedCourse);
    onClose();
  };


  return (
    <div
      className={`${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } fixed top-0 left-0 w-full h-full flex items-center justify-center transform z-30 transition-transform duration-300 ease-in-out bg-black bg-opacity-50`}
    >
      <div className="bg-white p-6 rounded-lg w-2/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Course</h2>
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
            <label htmlFor="courseName" className="block text-sm font-medium">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coursedescription" className="block text-sm font-medium">
              Course Description
            </label>
            <input
              type="text"
              id="coursedescription"
              name="coursedescription"
              value={formData.coursedescription}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseFee" className="block text-sm font-medium">
              Course Fee
            </label>
            <input
              type="number"
              id="courseFee"
              name="courseFee"
              value={formData.courseFee}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseduration" className="block text-sm font-medium">
              Course Duration
            </label>
            <input
              type="number"
              id="courseduration"
              name="courseduration"
              value={formData.courseduration}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-medium">
              Course Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
             Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseModal;
