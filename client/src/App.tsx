
import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import SignUp from "./Components/User/SignUp/SignUp"
import TutorSignUp from './Components/Tutor/SignUp/TutorSignup'
import TutorLogin from './Components/Tutor/Login/TutorLogin'
import Homepage from "./Pages/User/Home/Homepage"
import Dashboard from "./Pages/Admin/Dashboard/Dashboard"
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin"
import Login from "./Components/User/Login/Login"
import ResetPassword from "./Components/User/Login/ResetPassword"
import ForgotPassword from "./Components/User/Login/ForgotPassword"
import UserDetails from "./Pages/Admin/UserDetails/UserDetails"
import TutorView from './Pages/User/Tutors/TutorView'

import AdminTutorDetails from './Pages/Admin/TutorDetails/AdminTutorDetails'
import TutorHome from './Pages/Tutor/TutorHome/TutorHome'
import My_courses from './Pages/Tutor/My_courses/My_courses'
import My_students from './Pages/Tutor/My_Students/My_students'
import UserProfile from './Pages/User/UserProfile/UserProfile'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice/userSlice'
import Add_courses from './Pages/Tutor/Add_Courses/Add_courses'
import Add_Lessons from './Pages/Tutor/Add_Courses/Add_Lessons'
import UserOtp from './Components/User/SignUp/Otp'
import AddCategory from './Pages/Admin/Category/AddCategory'
import AllCategory from './Pages/Admin/Category/AllCategory'
import SinglePage from './Pages/Tutor/SinglePage/SinglePages'
import CourseViews from './Pages/Admin/CoursesView/CourseViews'
import SingleView from './Pages/User/SinglePage/SingleView'
import CartMenu from './Components/User/CartMenu/CartMenu'
import NotFound from './Components/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentSuccess from './Components/User/Payment/PaymentSuccess'
import TutorProfile from './Pages/Tutor/TutorProfile/TutorProfile'




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);
 

  return (
    <Router>
        <ToastContainer/> 
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/user_otp" element={<UserOtp/>}/>
        <Route path="/forget-password" element={<ForgotPassword/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>
        <Route path="/reset-password/:id/:token" element={<ResetPassword/>} />
        <Route path='/singlePage/:courseId' element={<SingleView/>}/>
        <Route path='/TutorView' element={<TutorView/>} />
        <Route path='/cart' element={<CartMenu/>}/>
        <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
        

        {/* Tutor side */}
        
        <Route path="/tutorRegister" element={<TutorSignUp/>}/>
        <Route path="/tutorLogin" element={<TutorLogin/>}/>
        <Route path="/tutorHome" element={<TutorHome/>}/>
        <Route path='/my_courses' element={<My_courses/>}/>
        <Route path='/singleView/:courseId' element={<SinglePage/>}/>
        <Route path='/my_students' element={<My_students/>}/>
        <Route path='/Add_Course' element={<Add_courses/>}/>
        <Route path='/Add_Lesson' element={<Add_Lessons/>}/> 
        <Route path='/tutorProfile' element={<TutorProfile/>}/>


        {/* admin side  */}

        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin_studentList' element={<UserDetails/>}/>
        <Route path='/admin_tutorList' element={<AdminTutorDetails/>}/>
        <Route path='/admincategory' element={<AllCategory/>}/>
        <Route path='/addCategory' element={<AddCategory/>}/>
        <Route path='/CourseViews' element={<CourseViews/>}/>
        <Route path="*" element={<NotFound/>}/>
  
      </Routes>
    </Router>
  )
}

export default App
