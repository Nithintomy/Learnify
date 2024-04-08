import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';


import axios from "axios";
import { AdminBaseUrl } from "../../../Api";

interface Category {
  _id: string;
  title: string;
  description: string;
}


const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    console.log("before fetching");
    axios
      .get(`${AdminBaseUrl}/getallcategory`)
      .then((response) => {
        console.log(response.data, "data here ");
        setCategories(response.data.CourseDetails); // Updated to use CourseDetails
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log the error
        toast.error("Error fetching data. Please try again later.");
      });
  }, []);

  return (
    <div className="px-3">
     

      <h1 className="text-lg text-black underline font-bold mb-4">Category Table</h1>
      <table className="w-full table-auto rounded-lg shadow-lg mt-2">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category._id}
              className="bg-gray-100"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{category.title}</td>
              <td className="px-4 py-2">{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
};

export default CategoryList;
