import React, {  useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/adminSlice/adminSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../Axios/axios";

function AdminLogin() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = studentEmail.trim();
    const trimmedPassword = studentPassword.trim();

    

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/adminLogin", {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      console.log("Admin Data from API:", response.data);
      dispatch(login(response.data));
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      toast.success("Admin Logged successfully");
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 dark:bg-gray-800 dark:hover:bg-opacity-80 min-h-screen flex justify-center items-center relative">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          <h2 className="text-center text-2xl font-bold text-gray-900">
           ADMIN LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 p-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setStudentEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setStudentPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-amber-900 py-4 px-4 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
