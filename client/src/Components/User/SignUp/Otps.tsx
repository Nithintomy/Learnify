import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { signup } from "../../../features/userSlice/userSlice";
import axiosInstance from "../../../Axios/axios";

function Otps() {
    const [otp, setOtp] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timer, setTimer] = useState<number>(60);
    const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
    const [invalidOTP, setInvalidOTP] = useState(false);
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("studentEmail");
  
    const globalData: { newOtp: string } = {
      newOtp: "",
    };
  
    useEffect(() => {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      if (timer === 0) {
        clearInterval(countdown);
      }
  
      return () => clearInterval(countdown);
    }, [timer]);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
       
        const response = await axiosInstance.post("/student/signup_verify", {
         otp
        });
    
        console.log("Response Data:", response.data);
        toast.success(response.data.message);
    
        if (response.status === 200) {
          toast.success("Signup successful");
          const userdata = response.data;
    
          localStorage.setItem("userData", JSON.stringify(userdata));
          localStorage.setItem("userToken", JSON.stringify(userdata.token));
    
          dispatch(signup(userdata));
    
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          console.log("else case")
          setInvalidOTP(true); // Set invalidOTP to true when OTP is incorrect
          const errorMessage =
            response.data && response.data.error
              ? response.data.error
              : "fa";
          toast.error(errorMessage);
        }
      } catch (error:any) {
        console.log("nokkenda catch case annu")
        console.error("An error occurred while verifying OTP:", error);
        toast.error(error.response.data.message);
      }
    };
    
    const handleResendOTP = async () => {
      try {
        const response = await axiosInstance.post("/student/resend_otp", {
          studentEmail:userEmail,
        });
    
        if (response.status === 200) {
         
          globalData.newOtp = response.data.newOtp;
          toast.success("New OTP Sent Successfully");
        } else {
          toast.error("Failed to send new OTP");
        }
      } catch (error: any) {
        console.error("An error occurred while resending OTP:", error);
        toast.error(error.response.data.message);
      }
    
      setOtpSent(true); 
      setTimer(60); 
    };
    
  
    useEffect(() => {
      if (localStorage.getItem("userData")) {
        navigate("/");
      }
    }, [navigate]);
  return (
    <>
   
    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
    <Link to="/register" className="border-b-2  pb-2 text-2xl font-bitter text-gray-900">
     <ReplyAllIcon/>
     <span className="ml-2">Sign Up</span>
     </Link>
  </div>
    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-x-hidden">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative  bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl mb-5 font-bold">Verify Your Account</h1>
          </div>
          <div className="w-full flex justify-center">

          </div>
          <div className="divide-y divide-gray-200">
              
            <form  onSubmit={(e) => handleSubmit(e)}>
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
             
              <div className="relative">
                <input
                   type="text"
                   placeholder="Please enter OTP"
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                   className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                   />
                   {invalidOTP && <p className="text-red-500">Invalid OTP</p>}
                <label
                  htmlFor="otp"
                  className="absolute mt-10 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-sm"
                >
                   Enter OTP
                </label>
              </div>
              
              <div className="flex w-full items-center">
                <button
                  type="submit"
                  className="shrink-0 inline-block w-24 text-sm rounded-lg bg-blue-600 py-3 font-bold text-white"
                >
                Submit
                </button> 
            </div>
            <div className="mt-4">
              {timer === 0 ? (
                <p>
                  <button
                    onClick={handleResendOTP}
                    className={`text-blue-500 underline ${
                      otpSent ? "blurred" : ""
                    }`}
                  >
                    Resend OTP
                  </button>
                </p>
              ) : (
                <p>Redirecting to signup page in {timer} seconds...</p>
              )}
            </div>
            </div>
          </form>
          </div>
        </div>
        

        </div>
      </div>
  
    <Toaster position="top-right" containerClassName="p-8 m-8" />
  </div>
  </>
  )
}

export default Otps
