import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Homepage from "./Pages/User/Home/Homepage";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import UserDetails from "./Pages/Admin/UserDetails/UserDetails";
import TutorView from "./Pages/User/Tutors/TutorView";
import AdminTutorDetails from "./Pages/Admin/TutorDetails/AdminTutorDetails";
import TutorHome from "./Pages/Tutor/TutorHome/TutorHome";
import My_courses from "./Pages/Tutor/My_courses/My_courses";
import My_students from "./Pages/Tutor/My_Students/My_students";
import UserProfile from "./Pages/User/UserProfile/UserProfile";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice/userSlice";
import Add_courses from "./Pages/Tutor/Add_Courses/Add_courses";
import Add_Lessons from "./Pages/Tutor/Add_Courses/Add_Lessons";
import AddCategory from "./Pages/Admin/Category/AddCategory";
import AllCategory from "./Pages/Admin/Category/AllCategory";
import SinglePage from "./Pages/Tutor/SinglePage/SinglePages";
import CourseViews from "./Pages/Admin/CoursesView/CourseViews";
import SingleView from "./Pages/User/SinglePage/SingleView";
import NotFound from "./Components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccess from "./Components/User/Payment/PaymentSuccess";
import TutorProfile from "./Pages/Tutor/TutorProfile/TutorProfile";
import OrderDetails from "./Pages/Admin/OrderDetails/OrderDetails";
import TutorDetails from "./Pages/User/Tutors/TutorDetails";
import Chat from "./Components/User/Chat/Chat";
import CategoriedCourses from "./Pages/User/Courses/CategoriedCourses";
import EntrolledCourse from "./Pages/User/EnrolledCourses/EntrolledCourse";
import CartView from "./Pages/User/Cart/CartView";
import CheckoutPage from "./Components/User/CheckoutPage/CheckoutPage";
import EntrolledSinglePage from "./Pages/User/EnrolledCourses/EntrolledSinglePage";
import Otps from "./Components/User/SignUp/Otps";
import ForgotPasswords from "./Components/User/Login/ForgotPasswords";
import ResetPasswords from "./Components/User/Login/ResetPasswords";
import Login from "./Pages/User/Login/Login";
import SignUp from "./Pages/User/SignUp/SignUp";
import TutorSignup from "./Pages/Tutor/TutorSignup/TutorSignup";
import TutorLogin from "./Pages/Tutor/TutorLogin/TutorLogin";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin";
import { tutorLogin } from "./features/tutorSlice/tutorSlice";






function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
    
  }, [dispatch]);

  useEffect(() => {
    const storedTutorData = localStorage.getItem("tutorData");
    if (storedTutorData) {
      const parsedTutorData = JSON.parse(storedTutorData);
      dispatch(tutorLogin(parsedTutorData));
    }
  }, [dispatch]);

 


  return (
    <Router>
      <Routes>

        {/* Protected User */}

          <Route element={<PrivateRoute userType="user" />}>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/enrolled-courses" element={<EntrolledCourse/>}/>
          <Route path="/cart" element={<CartView/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/entrolled_singlePage/:courseId" element={<EntrolledSinglePage/>}/>
          </Route>

        {/* Protected Tutor */}

          {/* <Route element={<PrivateRoute userType="tutor" />}> */}

          <Route path="/tutor_dashboard" element={<TutorHome />} />
          <Route path="/my_courses" element={<My_courses />} />
          <Route path="/singleView/:courseId" element={<SinglePage />} />
          <Route path="/my_students" element={<My_students />} />
          <Route path="/Add_Course" element={<Add_courses />} />
          <Route path="/Add_Lesson" element={<Add_Lessons />} />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          {/* <Route path="/tutorChats/:studentId" element={<TutorChat/>} /> */}

         {/* </Route> */}

        {/* Protected Admin */}

          <Route element={<PrivateRoute userType="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin_studentList" element={<UserDetails />} />
          <Route path="/admin_tutorList" element={<AdminTutorDetails />} />
          <Route path="/admincategory" element={<AllCategory />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/CourseViews" element={<CourseViews />} />
          <Route path="/Orders" element={<OrderDetails />} />
          
        </Route>

        {/* User Side  */}

        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgotPasswords />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswords />} />
        <Route path="/user_otp" element={<Otps />} />
        <Route path="/singlePage/:courseId" element={<SingleView />} />
        <Route path="/TutorView" element={<TutorView />} />
        <Route path="/tutor_details/:tutorId" element={<TutorDetails />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/courses" element={<CategoriedCourses/>}/>
        {/* <Route path="/singleChat" element={<SingleChat/>}/> */}
        

        {/* Tutor side */}

        <Route path="/tutorRegister" element={<TutorSignup />} />
        <Route path="/tutorLogin" element={<TutorLogin />} />

        {/* admin side  */}

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;