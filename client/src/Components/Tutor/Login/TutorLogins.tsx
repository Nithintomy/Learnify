import React from 'react'
import { useState} from "react";
import axiosInstance from "../../../Axios/axios";
import { tutorLogin } from "../../../features/tutorSlice/tutorSlice";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function TutorLogins() {
    const [tutorEmail,setTutorEmail]= useState('')
  const [tutorPassword,settrimmedPassword]=useState('')
  const dispatch =useDispatch()
  const navigate =useNavigate()

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const trimmedEmail =tutorEmail.trim();
      const trimmedPassword =tutorPassword.trim();

      if(trimmedEmail ==='' || trimmedPassword===''){
        return toast.error("Please Fill all required Fields")
      }
      
    if (trimmedPassword.length < 8) {
      return toast.error('Password must be at least 8 characters long');
    }

      try {
        const response = await axiosInstance.post('/tutor/login',{
          tutorEmail:trimmedEmail,
          password :trimmedPassword
          
        })

        const tutorData =response.data

        console.log(tutorData,"hhhhhhhhhhhhhhhhh")

        localStorage.setItem('tutorData',JSON.stringify(tutorData))
        localStorage.setItem('token',JSON.stringify(tutorData.token))

        dispatch(tutorLogin(tutorData))
                setTimeout(()=> {
                navigate('/tutor_dashboard');
                }, 2000)

        toast.success("Tutor Logged Successfuly")
        
      } catch (error:any) {
        return toast.error(error.response.data.message)
        
      }
  }
  return (
    <>
    
   
    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Tutor Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>setTutorEmail(e.target.value)}
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
                   onChange={(e)=>settrimmedPassword(e.target.value)}
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
              <p className="text-sm text-gray-600">
               Are you Intrested To Become a Tutor ? 
               

                  <Link to={'/tutorRegister'} className="whitespace-nowrap ml-2 text-sm font-semibold text-gray-900 hover:underline hover:text-indigo-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
          </div>
        </div>
        

        </div>
      </div>
  
    <Toaster position="top-right" containerClassName="p-8 m-8" />
  </div>
    </>
  )
}

export default TutorLogins
