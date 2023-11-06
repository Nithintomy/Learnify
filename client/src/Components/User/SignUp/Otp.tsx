import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { signup } from "../../../features/userSlice/userSlice";
import axiosInstance from "../../../Axios/axios";

const UserOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
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
    <div className="bg-light h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="container mx-auto">
        
        <div className="flex justify-center mt-5">
          <div className="w-1/4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Please enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`${
                    invalidOTP ? "border-red-500" : "border-gray-300"
                  } ...`}
                />
                {invalidOTP && <p className="text-red-500">Invalid OTP</p>}
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
            {error && <div className="mt-4 text-red-500">{error}</div>}
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
        </div>
      </div>
    </div>
  );
};

export default UserOtp;
