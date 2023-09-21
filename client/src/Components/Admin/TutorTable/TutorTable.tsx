import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { AdminBaseUrl } from '../../../Api'
import { toast } from 'react-toastify'





function TutorTable() {


    const [tutorDetails,setTutorDetails] =useState([])
 console.log()
    useEffect(() => {
        axios.get(`${AdminBaseUrl}/getAllTutor`)
          .then((res) => {
            if (res.data.TutorDetails) {
              console.log(res.data.TutorDetails)
              setTutorDetails(res.data.TutorDetails);
              
            } else {
              // Handle the case where the response doesn't have the expected data structure
              toast.error('No TutorDetails Found');
            }
          })
          .catch((error) => {
            console.error(error);
            if (error.response) {
              // Handle server response errors
              toast.error(error.response.data.message);
            } else if (error.message) {
              // Handle other errors with a message property
              toast.error(error.message);
            } else {
              // Handle other unexpected errors
              toast.error('An error occurred');
            }
          });
      }, []);

  return (
    <div>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                   Action
                </th>
            </tr>
        </thead>
        <tbody>
            {tutorDetails.map((tutor,index)=>(

           
            <tr key={tutor._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index +1}
                </th>
                <td className="px-6 py-4">
                  {tutor.tutorName}
                </td>
                <td className="px-6 py-4">
                    {tutor.tutorEmail}
                </td>
                <td className="px-6 py-4">
                    {tutor.phone}
                </td>
                <td className="px-6 py-4 ">
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Block</button>
                </td>
            </tr>
               ))}
                  
        </tbody>
    </table>
</div>

      
    </div>
  )
}

export default TutorTable
