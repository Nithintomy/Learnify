import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { UserBaseUrl } from "../../../Api";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

function Logins() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = studentEmail.trim();
    const trimmedPassword = studentPassword.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    axios
      .post(`${UserBaseUrl}/login`, {
        studentEmail: trimmedEmail,
        password: trimmedPassword,
      })
      .then((response) => {
        console.log(response.data, "data here");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        dispatch(login(response.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("User Logged In");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>  
      <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
      <Link to="/" className="border-b-2  pb-2 text-2xl font-bitter text-gray-900">
       <ReplyAllIcon/>
       <span className="ml-2">LEARNIFY</span>
       </Link>
    </div>
      
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-bold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={(e) => handleSubmit(e)}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    onChange={(e) => setStudentEmail(e.target.value)}
                    id="email"
                    name="email"
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
                    onChange={(e) => setStudentPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
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
                 
                  <Link
                  to="/forget-password"
                  className="w-full ml-5 text-center text-sm font-medium text-gray-600 hover:underline hover:text-indigo-500"
                >
                   Forgot your password?
                </Link>
                </div>
                <p className="text-sm text-gray-600">
                  Don't have an account?
                 

                    <Link to="/register" className="whitespace-nowrap ml-2 text-sm font-semibold text-gray-900 hover:underline hover:text-indigo-500">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
            </div>
          </div>
          <div className="w-full flex justify-center">
          
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  axios
                    .post(`${UserBaseUrl}/googleSignIn`, credentialResponse)
                    .then((res) => {
                      console.log(res, "response ondo");
                      dispatch(login(res.data));
                      if (!res.data.success) {
                        if (res.data.message === "User does not exist") {
                          toast.error(res.data.message);
                          
                        }
                      }
                      if (res.data.message === "login successfully") {
                        toast.success("Login Success");
                        console.log(res.data, "data vanilla");
                        localStorage.setItem("token", JSON.stringify(res.data.token));

                        localStorage.setItem("userData", JSON.stringify(res.data));
                        
                        console.log(res.data);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      }
                    })
                    .catch((err) => {
                      toast.error(err?.message);
                     
                    });
                }}
                onError={() => {
                  console.log("Login Failed");
                
                }}
                type="standard"
                size="large"
                text="continue_with"
                shape="square"
              />
            </div>

          </div>
        </div>
    
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
    </GoogleOAuthProvider>
  );
}

export default Logins;
