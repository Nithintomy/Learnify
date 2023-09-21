import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { AdminBaseUrl } from '../../../Api'
import { ToastContainer, toast } from 'react-toastify'
import './Toast.css'

function UserTable() {
    interface User  {
    _id:any;
    studentName:string,
    studentEmail:string,
    phone:number,
    password:string,
    photo:string[],
    isBlocked:boolean,
      }

    const [UserDetails,setUserDetails]=useState([])

   useEffect(() => {

    axios.get(`${AdminBaseUrl}/getAllStudents`)
    .then((res)=>{
        if(res.data.studentData){
            setUserDetails(res.data.studentData)
        }else{
            toast.error("No User Found")
        }
    }).catch((error)=>{
        toast.error(error)
    })
    
   }, [])

   const userStatus =async(user:User)=>{
    console.log("Button Clicked")
     try {
        if(user.isBlocked===false){
            console.log(user,"user found")
            console.log(user._id,"user id")
            await axios.put(`${AdminBaseUrl}/blockStudents/${user._id}`)
            user.isBlocked = true
            toast.success("user Blocked Successfully",{
                style: { background: "#ef4444", color: "black" },
              });
        }else{
            await axios.put(`${AdminBaseUrl}/unBlockStudents/${user._id}`)
            user.isBlocked =false
            toast.success("user UnBlocked Successfully",{
                style: { background: "#bef264", color: "black" }, // Set custom styles
              });
        }

        //update the user's status in local storage
        localStorage.setItem(
            `user_${user._id}_status`,
            user.isBlocked ? "Blocked" :"UnBlocked"
        )
        setUserDetails([...UserDetails])
        
     } catch (error) {
        toast.error(error as string)
     }

   }
   

  return (

    
    <>
<ToastContainer position="top-center"className="down-to-top" autoClose={1500} hideProgressBar />
<div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                   No.
                </th>
                <th scope="col" className="px-6 py-3">
                   Name
                </th>
                <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 ">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {UserDetails.map((user:User,index)=>(

            <tr className="border-b border-gray-200 dark:border-gray-700">
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {index + 1}
                </th>
                <td className="px-6 py-4">
                    {user.studentName}
                </td>
                <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                    {user.studentEmail}
                </td>
                <td className="px-6 py-4">
                    {user.phone}
                </td>
                <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                <button onClick={()=>userStatus(user)} type="button" className={user.isBlocked===false ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-7 py-2.5 text-center mr-2 mb-2":"text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}>
                    {user.isBlocked===false?"Block ":"UnBlock"}</button>   
                </td>
            </tr>
             ))}

        </tbody>
    </table>
</div>


      
    </>
  )
}

export default UserTable
