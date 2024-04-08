import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/adminSlice/adminSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../Axios/axios";

function AdminLogins() {
  const [adminEmail, setadminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = adminEmail.trim();
    const trimmedPassword = adminPassword.trim();

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
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-l from-black to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-bold">Admin Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setadminEmail(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="flex w-full items-center">
                      <button
                        type="submit"
                        className="shrink-0 inline-block w-24 text-sm rounded-lg bg-blue-600 py-3 font-bold text-white"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Toaster position="top-right" containerClassName="p-8 m-8" />
      </div>
    </>
  );
}

export default AdminLogins;
