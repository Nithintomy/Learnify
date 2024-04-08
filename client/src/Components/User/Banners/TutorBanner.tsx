import React from 'react';
import Tutorimg from '../../../assets/instructor.jpg'
import { Link } from 'react-router-dom';


function TutorBanner() {
  return (
    <div className="hero min-h-screen bg-base-200 dark:text-white dark:bg-black">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={Tutorimg} className="max-w-sm rounded-2xl shadow-2xl" alt="Tutor Banner" />
        <div>
          <h1 className="text-3xl font-bold">Unlock Your Potential with Dedicated Tutors!</h1>
          <p className="py-6">Explore our talented tutors and take your learning to new heights. <br /> Let them guide you towards success and achieve your educational goals.</p>
          <Link to="/TutorView">
          <button className="btn bg-yellow-500 hover:bg-yellow-600">View Tutors</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TutorBanner;
