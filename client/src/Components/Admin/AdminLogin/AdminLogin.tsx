import React, { useEffect, useState } from "react"
import {toast,ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { selectUser,login } from "../../../features/userSlice/userSlice"
import {useDispatch,useSelector}  from 'react-redux'
import axiosInstance from "../../../Axios/axios"




function AdminLogin() {

    
        const [studentEmail,setStudentEmail]=useState('')
        const [studentPassword,setStudentPassword]=useState('')
        const dispatch= useDispatch();
        const admin =useSelector(selectUser)
        const navigate = useNavigate();
    
        const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const trimmedEmail = studentEmail.trim();
            const trimmedPassword = studentPassword.trim();
    
    
            if(trimmedEmail==="" || trimmedPassword===''){
                toast.error("Please fill in all required fields")
                 return;
            }
    
            try {
              console.log("Before axios call")
                const response =await axiosInstance.post("/admin/adminLogin",{
                    email:trimmedEmail,
                    password:trimmedPassword
                })
                console.log(response.data,"data here")
                dispatch(login(response.data))
                    setTimeout(()=> {
                    navigate('/dashboard');
                    }, 2000)
    
                toast.success("Admin Logged successfully")
               
            } catch (error:any) {     
              
                toast.error(error.response.data.message)
            }
        }
    
        // useEffect(() => {
        //  if(user){
        //   navigate('/')
        //  }else{
        //   navigate('/login')
        //  }
    
        // }, [])
    
      return (
        <div>
    
        <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Admin Log In
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e)=>setStudentEmail(e.target.value)}
                   />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                   
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                    
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e)=>setStudentPassword(e.target.value)}
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center mb-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
    
            </div>
          </div>      
        </div>
        </section>
        </div>
      )
    }
    

    

export default AdminLogin
