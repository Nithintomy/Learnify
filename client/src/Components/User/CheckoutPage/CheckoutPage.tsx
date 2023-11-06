import React from 'react';
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-transparent p-4 w-full space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
        Payment Methods
        </h1>

        <div className="rounded-lg bg-white bg-opacity-90 hover:shadow-md text-center p-20" >
          <h2 className="text-xl font-semibold text-blue-600 ">Pay with Razorpay</h2>
          <p className="text-gray-600">
            Secure and convenient payments with Razorpay.
          </p>
          <Link to="/razorpay-payment">
            <button className="mt-4  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ">
              Proceed with Razorpay
            </button>
          </Link>
        </div>

        <div className="rounded-lg bg-white bg-opacity-90 hover:shadow-md text-center p-20">
          <h2 className="text-xl font-semibold text-green-600">Pay with Stripe</h2>
          <p className="text-gray-600">Safe and easy payments with Stripe.</p>
          <Link to="/stripe-payment">
            <button className="mt-4  px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Proceed with Stripe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
