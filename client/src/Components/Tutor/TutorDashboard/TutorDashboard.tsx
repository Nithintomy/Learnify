import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaRegCalendarMinus } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminBaseUrl, TutorBaseUrl } from "../../../Api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectTutor } from "../../../features/tutorSlice/tutorSlice";
import Breadcrumbs from "../../common/Breadcrumbs";

function TutorDashboard() {
  const tutor = useSelector(selectTutor);
  const tutorId = tutor?._id;

  const [counts, setCounts] = useState({
    totals: 0,
    totalUsersCount: 0,
    totalOrderCount: 0,
    totalTutorCount: 0,
    CourseCount: 0,
  });
  const [courseCount, setCourseCount] = useState([]);

  useEffect(() => {
    axios
      .get(`${AdminBaseUrl}/total_count`)
      .then((response) => {
        console.log(response.data, "count response");
        setCounts(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${TutorBaseUrl}/tutor/${tutorId}/courseCount`)
      .then((response) => {
        console.log(response.data, "data from courses");
        setCourseCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-6">
      <Breadcrumbs/>
      <div className="flex items-center bg-gray-200 py-5">
        <div className="max-w-screen-xl w-full overflow-x-auto px-4">
          <h2 className=" font-bold text-gray-800 mb-4 text-2xl underline font-bitter">
            DASHBOARD
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <div className=" h-[10rem] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              TOTAL USERS
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {counts?.totalUsersCount}
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>

        <div className=" h-[10rem] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              Number of Courses
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {counts?.totalOrderCount}
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>

      <div className="flex mt-6 sm:space-x-6 ">
        <div className="w-full sm:w-3/3 bg-white shadow-md rounded-md p-4 cursor-pointer">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-4 border-b border-[#EDEDED] mb-4">
            <h2 className="text-[#4e73df] text-lg font-bold">Total Courses</h2>
            <FaEllipsisV className="text-gray-500 cursor-pointer" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[{ total: courseCount }]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="total" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total courses"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TutorDashboard;
