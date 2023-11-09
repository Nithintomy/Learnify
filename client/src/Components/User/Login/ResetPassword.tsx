import React from 'react'
import {useState} from 'react'
import {ToastContainer} from 'react-toastify'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'


function ResetPassword() {

  const [password,setPassword]=useState('')
  const nav= useNavigate()
  const {id,token}=useParams()
 
  
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    axios.post(`http://localhost:5000/student/reset-password/${id}/${token}`,{password})
    .then(res=>{
      if(res.data.Status==="Success"){
        nav('/login')
      }
    }).catch(error=>console.log(error))




  }

    

  return (
    <>
    
      <section className="bg-gray-50 dark:bg-gray-900 pt-12  ">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Reset Your Password
              </h2>
            </div>
          
         
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                   New Password
                  </label>
                  <div className="mt-2">
                    <input
            
                      name="password"
                      type="password"
                      autoComplete="email"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>

                

                <div className='pb-10'>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                   Update
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </section>

 
    
    </>
  )
}

export default ResetPassword
