import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { AdminBaseUrl } from '../../../Api';

const AddCategorys: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

   
        e.preventDefault();
        axios.post(`${AdminBaseUrl}/addCategory`,{
            title,
            description
        })
        .then((response) => {
            console.log(response.data);
            toast.success('Category added successfully'); 
            setTimeout(() => {
              
            navigate('/admincategory')
            },2000);

          })
          .catch((error) => {
            console.error(error);
            toast.error('Category alredy exist'); // You can use toast for error notifications
          });
        }

      
  return (
    
    <div className="px-3 ">
      <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="text-gray-700 font-bold mb-2 block">
              Category Title
            </label>
            <input
              type="text"
              id="category"
              name="title"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter category"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-gray-700 font-bold mb-2 block">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
};

export default AddCategorys;
