import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { selectUser, signup } from "../../../features/userSlice/userSlice";

const UserOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<number>(60);
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent

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
      const response = await axios.post(
        "http://localhost:5000/student/signup_verify",
        {
          otp,
        }
      );

      if (response.status === 200) {
        toast.success("Signup successful");
        const userdata = response.data;
        
        localStorage.setItem("userData", JSON.stringify(userdata));
        localStorage.setItem("userToken", JSON.stringify(userdata.token));

        dispatch(signup(userdata));
       
         setTimeout(() => {
            
            navigate("/");
         }, 2000);
      } else {
        const errorMessage =
          response.data && response.data.message
            ? response.data.message
            : "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred while verifying OTP:", error);
      toast.error("An error occurred");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/student/signup_verify",
        {
          otp,
         
        }
      );
  
      if (response.status === 200) {
        toast.success("New OTP Sent Successfully");
      } else {
        toast.error("Failed to send new OTP");
      }
    } catch (error) {
      console.error("An error occurred while resending OTP:", error);
      toast.error("An error occurred");
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
      <div className="container mx-auto">
        <ToastContainer />
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
                  className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-indigo-400"
                />
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
