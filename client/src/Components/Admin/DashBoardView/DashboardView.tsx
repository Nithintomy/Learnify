import React, {  useEffect, useState } from 'react';
import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MyPieChart from './PieChart';
import { AdminBaseUrl } from '../../../Api';
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';



interface MonthlySale {
    _id: number;
    total: number;
  }

function DashboardView() {

    const [counts,setCounts] =useState({
        totals:0,
        totalUsersCount:0,
        totalOrderCount:0,
        totalTutorCount:0,
        CourseCount:0

    })
    const [monthlySales,setMonthlySales] =useState<MonthlySale[]>([])


   useEffect(() => {
        axios.get(`${AdminBaseUrl}/total_count`)
        .then((response)=>{
            console.log(response.data,"count response")
            setCounts(response.data)

        })
        .catch((error)=>{
            console.log(error)
            toast.error(error)
        })
   
   }, [])

   useEffect(()=>{

    axios.get(`${AdminBaseUrl}/sales_report`)
    .then((response)=>{
      console.log(response ,"sales_report ")
        const currentMonth =new Date().getMonth() + 1;

        const initialMonthlySales =Array.from({length:12},(_,index)=>{
            const month = ((currentMonth + index - 1) % 12) + 1; // Ensure January is the first month
            return { _id: month, total: 0 };
          });

        // Update the initial array with the fetched data
        const updatedMonthlySales = initialMonthlySales.map((item)=>{
            const matchingData =response.data.find((date: {_id:number})=>date._id ===item._id)
            return matchingData || item
        })

         // Sort the data by month
         updatedMonthlySales.sort((a, b) => a._id - b._id);

         setMonthlySales(updatedMonthlySales);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
   

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-6 bg-gray-400 ">
       
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold underline cursor-pointer">
          Dashboard
        </h1>
       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <div className="h-[10rem] rounded-lg bg-gray-100 border-l-4 border-[#4E73DF] flex items-center justify-between px-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-sm font-bold">EARNINGS (MONTHLY)</h2>
            <h1 className="text-2xl font-bold text-[#5a5c69] mt-2">${counts?.totals}</h1>
          </div>
          <FaRegCalendarMinus className="text-[#4E73DF] text-3xl" />
        </div>

        <div className=' h-[10rem] rounded-[8px] bg-gray-100 border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
            <div>
                <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>
                    TOTAL USERS</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{counts?.totalUsersCount}</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=' h-[10rem] rounded-[8px] bg-gray-100 border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
            <div>
                <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>TOTAL TUTORS</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{counts?.totalTutorCount}</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=' h-[10rem] rounded-[8px] bg-gray-100 border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
            <div>
                <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>Total Orders</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{counts?.totalOrderCount}</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>

      <div className="flex mt-6 sm:space-x-6 w-full">
        <div className="w-full sm:w-2/3 bg-white shadow-md rounded-md p-4 cursor-pointer">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 border-b border-[#EDEDED] mb-4">
            <h2 className="text-[#4e73df] text-lg font-bold">Earnings Overview</h2>
            <FaEllipsisV className="text-gray-500 cursor-pointer" />
          </div>
          {/* Add your chart here */}
          <LineChart
          width={500}
          height={300}
          data={monthlySales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" name="Monthly Sales" stroke="#8884d8" />
        </LineChart>
        </div>

        <div className="w-full sm:w-1/3 bg-white shadow-md rounded-md p-4 cursor-pointer">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 border-b border-[#EDEDED]">
            <h2 className="text-[#4e73df] text-lg font-bold">Revenue Resources</h2>
            <FaEllipsisV className="text-gray-500 cursor-pointer" />
          </div>
          <div className="pl-4">
            {/* Add your pie chart or content here */}
            <MyPieChart counts={counts} />
          </div>
        </div>
      </div>

      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
}

export default DashboardView;
