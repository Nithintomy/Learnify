import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TutorBaseUrl } from '../../../Api'
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from 'react-spinners';
import Breadcrumbs from '../../common/Breadcrumbs';



interface User  {
  _id:any;
  studentName:string,
  studentEmail:string,
  phone:number,
  password:string,
  photo:string,
  isBlocked:boolean,
    }

function StudentTable() {
    
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

   console.log(UserDetails,"detaisl")

   if (loading) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RingLoader loading={true} color="#000000" speedMultiplier={1} size={150} />
    </div>
   }

  return (
    <div>
        <Breadcrumbs/>
 
    <div className="overflow-x-auto relative bg-gray-100 p-5 rounded-md shadow-2xl">
    
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </thead>
    {UserDetails.map((user:User)=>(
    <tbody>
        
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={user.photo !== undefined && user.photo !== "" ? user.photo : "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg"} 
  alt="User Avatar " />
              </div>
            </div>
            <div>
              <div className="font-bold"> {user.studentName}</div>
              
            </div>
          </div>
        </td>
        <td>
        
          <br/>
          <span className="badge badge-neutral badge-sm">{user.studentEmail}</span>
        </td>
        <td>{user.phone}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
     
    </tbody>
         ))}
  </table>
</div>
<Toaster position="top-right" containerClassName="p-8 m-8" />
   </div>
  )
}

export default StudentTable
