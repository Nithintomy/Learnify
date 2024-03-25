import React from 'react'
import {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import {useNavigate, useParams,Link} from 'react-router-dom'
import { BaseUrl } from '../../../Api'
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function ResetPasswords() {
    const [password,setPassword]=useState('')
    const nav= useNavigate()
    const {id,token}=useParams()
   
    
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
  
      axios.post(`${BaseUrl}/student/reset-password/${id}/${token}`,{password})
      .then(res=>{
      toast.success("Password Reset Successfully")
      setTimeout(() => {
        if(res.data.Status==="Success"){
            nav('/login')
          }
        
      }, 2000);
      }).catch(error=>{
        console.log(error)
        toast.error("Error Occured! Try Again Later")
      })
  
  
  
  
    }
  
  return (
    <>
    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
    <Link to="/login" className="border-b-2  pb-2 text-2xl font-bitter text-gray-900">
     <ReplyAllIcon/>
     <span className="ml-2">LOGIN</span>
     </Link>
  </div>
    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative  bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl mb-5 font-bold"> Reset Your Password</h1>
          </div>
          <div className="w-full flex justify-center">

          </div>
          <div className="divide-y divide-gray-200">
              
            <form   onSubmit={handleSubmit}>
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
             
              <div className="relative">
                <input
                    name="password"
                    type="password"
                    autoComplete="email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 />
                <label
                  htmlFor="otp"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                   New Password
                </label>
              </div>
              
              <div className="flex w-full items-center">
                <button
                  type="submit"
                  className="shrink-0 inline-block w-24 text-sm rounded-lg bg-blue-600 py-3 font-bold text-white"
                ><LockOpenIcon/>
                <span className='ml-2'> Update</span>
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
  )
}

export default ResetPasswords
