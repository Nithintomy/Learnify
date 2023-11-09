import React, {useState } from "react";
import logo from "../../../assets/stud logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../features/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { UserBaseUrl } from "../../../Api";
import axios from "axios";
import { GoogleOAuthProvider ,GoogleLogin} from "@react-oauth/google";



function Login() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [emailErr,setEmailErr]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CLIENT_ID= import.meta.env.VITE_CLIENT_ID || '';

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
        localStorage.setItem("userData",JSON.stringify(response.data.user))
      
        dispatch(login(response.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        toast.success("User Logged In");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    
    <GoogleOAuthProvider clientId={CLIENT_ID}>
     
    <div className="relative" style={{background:"#ecfeff"}}>
   
      <iframe
        src="https://giphy.com/embed/EILhSIPzBUqru"
        width='100%'
        height="100%"
        className="absolute inset-0 z-0 "
       
        allowFullScreen
        title="Giphy Embed"
      ></iframe>
    <section className="bg-transparent min-h-screen flex justify-center items-center relative z-10">
    <ToastContainer />
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-6 space-y-4">
          <img
            className="mx-auto h-10 w-auto"
            src={`${logo}?color=indigo&shade=600`}
            alt="Learnify"
          />
          <h2 className="text-center text-2xl font-bold text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forget-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                onChange={(e) => setStudentPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-amber-900 py-4 px-4 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>
          </form>

         {/* Google Login */}
         <div className="mt-5 ml-16">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  axios
                    .post(`${UserBaseUrl}/googleSignIn`, credentialResponse)
                    .then((res) => {
                      console.log(res, "response ondo");
                      if (!res.data.success) {
                        if (res.data.message === "User does not exist") {
                          toast.error(res.data.message);
                          setEmailErr(res.data.message);
                        }
                      }
                      if (res.data.message === "login successfully") {
                        toast.success("Login Success");
                        console.log(res.data, "data vanilla");
                        localStorage.setItem("token", JSON.stringify(res.data.token));

                        localStorage.setItem("userData", JSON.stringify(res.data));
                        dispatch(login(res.data));
                        console.log(res.data);
                        setTimeout(() => {
                          navigate("/");
                        }, 2000);
                      }
                    })
                    .catch((err) => {
                      toast.error(err?.message);
                      if (err?.message === "Request failed with status code 400") {
                        setEmailErr("User does not Exist");
                      } else {
                        setEmailErr(err?.message);
                      }
                    });
                }}
                onError={() => {
                  console.log("Login Failed");
                  setEmailErr("Login Failed");
                }}
                type="standard"
                size="large"
                text="continue_with"
                shape="square"
              />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 py-4">
            Not a member?{" "}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;