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
  const userName =user?user.name:''
 
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
      
      <p className="text-4xl font-medium text-gray-900  dark:text-white ml-12 mt-9 mb-4" >Let's start learning<span className="text-orange-lighter-900">,{userName}</span></p>

        <div className='px-3 lg:px-3 '>
        <CourseCard />
            
        </div>


           <Footer/>   
     
    </div>
  )
}

export default Homepage
