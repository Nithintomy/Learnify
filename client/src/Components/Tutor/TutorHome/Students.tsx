import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TutorBaseUrl } from '../../../Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';



interface User  {
  _id:any;
  studentName:string,
  studentEmail:string,
  phone:number,
  password:string,
  photo:string[],
  isBlocked:boolean,
    }

function Students() {
  
      const [UserDetails,setUserDetails]=useState([])
      const [loading, setLoading] = useState(true);
  
     useEffect(() => {
  
      axios.get(`${TutorBaseUrl}/getAllStudents`)
      .then((res)=>{
          if(res.data.studentData){
              setUserDetails(res.data.studentData)
              setLoading(false)
          }else{
              toast.error("No User Found")
          }
      }).catch((error)=>{
          toast.error(error)
      })
      
     }, [])

     if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
      </div>
     }


  return (
    <>
    <ToastContainer position="top-center"className="down-to-top" autoClose={1500} hideProgressBar />
    <div className=" relative overflow-x-auto shadow-md sm:rounded-lg  mt-10 h-screen ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                       No.
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50">
                       Name
                    </th>
                    <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50">
                        Phone
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                {UserDetails.map((user:User,index)=>(
    
                <tr className="border-b border-gray-200 dark:border-gray-700">
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {index + 1}
                    </th>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {user.studentName}
                    </td>
                    <td className="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                        {user.studentEmail}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {user.phone}
                    </td>
                    
                </tr>
                 ))}
    
            </tbody>
        </table>
    </div>
    
    
          
        </>
  );
}

export default Students;
