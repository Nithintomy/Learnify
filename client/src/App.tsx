
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import SignUp from "./Components/User/SignUp/SignUp"
import TutorSignUp from './Components/Tutor/SignUp/TutorSignup'
import TutorLogin from './Components/Tutor/Login/TutorLogin'
import Homepage from "./Pages/Homepage"
import TutorHome from "./Pages/Tutor/TutorHome/TutorHome"
import Dashboard from "./Pages/Admin/Dashboard/Dashboard"
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin"
import Login from "./Components/User/Login/Login"





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/tutorRegister" element={<TutorSignUp/>}/>
        <Route path="/tutorLogin" element={<TutorLogin/>}/>
        <Route path="/tutorHome" element={<TutorHome/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="*" element={<h1>Page Not Found</h1>}/>
      </Routes>
    </Router>
  )
}

export default App
