import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AdminBaseUrl } from '../../../Api'
import { toast } from 'react-toastify';

interface Order {
    _id: string;
    studentId: {
      studentName: string;
    };
    courseId: {
      courseName: string;
    };
    tutorId: {
      tutorName: string;
    };
    status: string;
  }
  

function Orders() {
    const [OrderTable ,setOrderTable] = useState<Order[]>([])

  useEffect(()=>{
    axios.get(`${AdminBaseUrl}/orderView`)
    .then((response)=>{
        setOrderTable(response.data.order)

    })
    .catch((error)=>{
        toast.error(error.message);
      });

  },[])

    return (
        <div>

            <h1>ORDER TABLE</h1>
            
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
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tutor
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Payment Status
                    </th>
                    
                </tr>
            </thead>
            <tbody>
            {OrderTable.map((order, index) => (
    
               
                <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index +1}
                    </th>
                    <td className="px-6 py-4">
                    {order.studentId?.studentName}
                    </td>
                    <td className="px-6 py-4">
                    {order.courseId.courseName}
                    </td>
                    <td className="px-6 py-4">
                    {order.tutorId.tutorName}
                    </td>
                    <td className="px-6 py-4 ">
                    {order.status}
                    </td>
                    

                  
                    
                </tr>
                   ))}
                      
            </tbody>
        </table>
    </div>
    
          
        </div>
  )
}

export default Orders
