import React from 'react';
import Tutorimg from '../../../assets/instructor.jpg'
import { Link } from 'react-router-dom';


function TutorBanner() {
  return (
    <div className="hero min-h-screen bg-base-200 dark:text-white dark:bg-black">
    <div className="hero-content flex flex-col lg:flex-row items-center justify-center lg:justify-between">
      <img src={Tutorimg} className="max-w-md lg:max-w-none rounded-2xl shadow-2xl mb-8 lg:mb-0 lg:mr-8" alt="Tutor Banner" />
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Unlock Your Potential with Dedicated Tutors!</h1>
        <p className="py-4 lg:py-6">Explore our talented tutors and take your learning to new heights. <br /> Let them guide you towards success and achieve your educational goals.</p>
        <Link to="/TutorView">
          <button className="btn bg-yellow-500 hover:bg-yellow-600">View Tutors</button>
        </Link>
      </div>
    </div>
  </div>
  );
}

export default TutorBanner;
