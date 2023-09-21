import React from 'react'
import { useState ,useEffect} from "react";
import { toast,ToastContainer } from "react-toastify";
import axiosInstance from "../../../Axios/axios";
import { login,selectTutor } from "../../../features/tutorSlice/tutorSlice";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function TutorLogin() {
  const tutor = useSelector(selectTutor)
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

        localStorage.setItem('tutorData',JSON.stringify(tutorData))
        localStorage.setItem('token',JSON.stringify(tutorData.token))

        dispatch(login(tutorData))
                setTimeout(()=> {
                navigate('/tutorHome');
                }, 2000)

        toast.success("Tutor Logged Successfuly")
        
      } catch (error:any) {
        return toast.error(error.response.data.message)
        
      }
  }
    //  useEffect(() => {
    //    if(tutor){
    //   navigate('/tutorHome')
    //    }else{
    //     navigate('/tutorLogin')
    //    }
     
  
    //  }, [])
     

     
  return (
    <div>
        <ToastContainer/>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Tutor Login
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
                  onChange={(e)=>setTutorEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  onChange={(e)=>settrimmedPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/tutorRegister'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            
             Sign Up
           
            </Link>
          </p>
        </div>
      </div>
  
      
    </div>
  )
}

export default TutorLogin
