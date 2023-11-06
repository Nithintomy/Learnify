import React from 'react';
import {useEffect} from 'react'
import Carousel from "../../../Components/User/Carousel/Carousel"
import Navbar from "../../../Components/User/Navbar/Navbar"
import { useDispatch,useSelector  } from "react-redux";
import { login } from "../../../features/tutorSlice/tutorSlice";
import { selectUser } from '../../../features/userSlice/userSlice';

import Footer from '../../../Components/User/Footer/Footer';
import { CourseCard } from '../../../Components/User/Card/cards';



function Homepage() {
  const dispatch =useDispatch()
  const user = useSelector(selectUser);
  console.log(user,"userrrrr")
  const userName =user?.user?.studentName
  console.log(userName,"namem")
 
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);



  return (   
    <div className=' dark:bg-black'>

      <Navbar/>
      <Carousel/>  
      
      
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white ml-24 m-14">Let's start learning,<span className="text-black text-3xl font-bold ml-4">{userName}</span></h1>

        <div className='px-3 lg:px-3 '>
        <CourseCard />
            
        </div>


           <Footer/>   
     
    </div>
  )
}

export default Homepage
