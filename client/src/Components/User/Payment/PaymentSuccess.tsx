import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PaymentSuccess() {

    const searchQuery =useSearchParams()[0]

    const referenceNo =searchQuery.get("reference")

    const nav= useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Success!</h1>
        <h1 className="text-lg font-semibold text-amber-900 mb-4">Reference Number : {referenceNo}</h1>
        <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your order has been successfully processed.</p>
        <div className="flex justify-center space-x-4">
        <Link
        to="/enrolled-courses"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
      >
        Enrolled Courses
      </Link>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
            onClick={() => {
                nav('/')
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
