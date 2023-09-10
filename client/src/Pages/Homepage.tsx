import {useEffect} from 'react'
import Carousel from "../Components/User/Carousel/Carousel"
import Navbar from "../Components/User/Navbar/Navbar"
import { useDispatch,useSelector  } from "react-redux";
import { login } from "../features/tutorSlice/tutorSlice";
import { CourseCard } from '../Components/User/Card/cards';
import { selectUser } from '../features/userSlice/userSlice';




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
    <div>

      <Navbar/>
      <Carousel/>  
      <h1>Let's start learning, {userName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        {/* First CourseCard */}
        <div className="mb-4">
          <CourseCard />
        </div>
  
        <div className="mb-4">
          <CourseCard />
        </div>
  
        <div className="mb-4">
          <CourseCard />
        </div>
        <div className="mb-4">
          <CourseCard />
        </div>

       
      </div>
     
    </div>
  )
}

export default Homepage
