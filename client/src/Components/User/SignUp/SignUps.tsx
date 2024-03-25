import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../Axios/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';



function SignUps() {
    
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfirmPassword] = useState("");
  const isStrongPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "";
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedstudentName = studentName.trim();
    const trimmedstudentEmail = studentEmail.trim();
    const trimmedPhone = phone.trim();
    const trimmedpassword = password.trim();

    if (
      trimmedstudentName === "" ||
      trimmedstudentEmail === "" ||
      trimmedPhone === "" ||
      trimmedpassword === ""
    ) {
      toast.error("Require All fields");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("password Must be atleast 8 characters");
      return;
    }

    if (password !== confimPassword) {
      toast.error("Password Not Match");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Invalid phone number. It must contain exactly 10 digits.");
      return;
    }

    try {
      console.log("before axios call");
      const response = await axiosInstance.post("/student/register", {
        studentName: trimmedstudentName,
        studentEmail: trimmedstudentEmail,
        phone: trimmedPhone,
        password: trimmedpassword,
      });
  
      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response.data.message);
          navigate("/user_otp", { state: { studentEmail: studentEmail } });
          
        }, 1000);
      } else {
        toast.error("Error registering user");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>  
      <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
      <Link to="/login" className="border-b-2  pb-2 text-2xl font-bitter text-gray-900">
       <ReplyAllIcon/>
       <span className="ml-2">Login</span>
       </Link>
    </div>
      
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative  bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl mb-5 font-bold">Sign Up</h1>
            </div>
            <div className="w-full flex justify-center">
          
          <GoogleLogin
                
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse, "hi");
                  axios
                    .post(`${UserBaseUrl}/googleSignUp`, credentialResponse)
                    .then((res) => {
                      toast.success("Google signup success");
                      console.log(res, "loged in");
                      navigate("/");
                    })
                    .catch((err) => {
                      if (err.response && err.response.status === 400) {
                        // User already exists
                       
                        toast.error("User already exists");
                      } else {
                        
                        toast.error(err?.message || "Login Failed");
                      }
                    });
                }}
                onError={() => {
                  console.log("");
                 
                }}
                type="standard"
                size="large"
                text="continue_with"
                shape="square"
              />
            </div>
            <div className="divide-y divide-gray-200">
                
              <form  onSubmit={(e) => handleSubmit(e)}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    onChange={(e) => setStudentName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Enter Your FullName"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    FullName
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={(e) => setStudentEmail(e.target.value)}
                    id="email"
                    name="email"
                    value={studentEmail}
                    type="text"
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
                     onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    name="phone"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                     Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    name="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    value={password}
                    placeholder="••••••••"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                      Password
                  </label>
                </div>
                <div className="relative">
                  <input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                     id="password"
                     type="password"
                     name="password"
                     value={confimPassword}
                     placeholder="••••••••"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" 
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                     Confirm password
                  </label>
                </div>
                
                <div className="flex w-full items-center">
                  <button
                    type="submit"
                    className="shrink-0 inline-block w-24 text-sm rounded-lg bg-blue-600 py-3 font-bold text-white"
                  >
                   Sign up
                  </button>
                 
                  <p className="text-sm ml-6 font-light text-gray-500 dark:text-gray-400">
                    Already have an account?
                   <span className="whitespace-nowrap ml-2 text-sm font-semibold text-gray-900 hover:underline hover:text-indigo-500"> <Link to={"/login"}>Login here</Link></span>
                  </p>
              </div>
              </div>
            </form>
            </div>
          </div>
          

          </div>
        </div>
    
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
    </GoogleOAuthProvider>
  )
}

export default SignUps
