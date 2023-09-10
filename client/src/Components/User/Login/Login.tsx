import React, { useEffect, useState } from "react";
import logo from "../../../assets/stud logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { selectUser, login } from "../../../features/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserBaseUrl } from "../../../Api";
import axios from "axios";
import { GoogleOAuthProvider ,GoogleLogin} from "@react-oauth/google";



function Login() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [emailErr,setEmailErr]=useState("")
  const [passErr,setPassErr] =useState("")
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = studentEmail.trim();
    const trimmedPassword = studentPassword.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    axios
      .post(`${UserBaseUrl}/login`, {
        studentEmail: trimmedEmail,
        password: trimmedPassword,
      })
      .then((response) => {
        console.log(response.data, "data here");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user",JSON.stringify(response.data.user))
        dispatch(login(response.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("User created successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
   
        <GoogleOAuthProvider clientId="164369348447-fpdvkvekc46tmvpo77b2f319u0f59mos.apps.googleusercontent.com">
      <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                className="mx-auto h-10 w-auto"
                src={`${logo}?color=indigo&shade=600`}
                alt="Learnify"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            {/* google Login */}
          
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  axios.post(`${UserBaseUrl}/googleSignIn`,
                  credentialResponse
                  ).then((res)=>{
                    if(!res.data.success){
                      if(res.data.message==="user doesnot Exist"){
                        toast.error(res.data.message)
                        setEmailErr(res.data.message)
                      }
                    }
                    if(res.data.message==="Login success"){
                      toast.success("Login Success")
                      localStorage.setItem("jwtToken",JSON.stringify(res.data.token))
                      localStorage.setItem("user",JSON.stringify(res.data.user))
                      window.location.href = "/";
                    }

                  }).catch((err)=>{
                    toast.error(err?.message)
                    if(err?.message==="Request failed with status code 400"){
                      setEmailErr("User does not Exist")
                    }else{
                      setEmailErr(err?.message)
                    }
                  })    
                }}
                onError={() => {
                  console.log("Login Failed");
                  setEmailErr("Login Failed")
                }}
                type="standard"
                size="large"
                text="continue_with"
                shape="square"
              />
              
            

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setStudentEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setStudentPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link to={"/register"}>Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      </GoogleOAuthProvider>
 
  );
}

export default Login;
