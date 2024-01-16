import React from 'react';
import HomeVideo from '../../../assets/LearnifyHomeVideo.mp4'

function HomeMain() {
  return (
    <div className="relative h-screen flex items-center justify-start">
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          id="background-video"
        >
          <source src={HomeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute text-left text-black ml-16 mt-28 font-serif"> 
  <h1 className="text-6xl font-extrabold">Welcome to Learnify</h1>
  <p className="text-2xl text-center">Start your learning journey with us.</p> 
  
  <div className="mt-6 text-center">
    <button className="relative  hover:bg-blue-100 text-black font-medium py-2 px-4 rounded transition duration-300 overflow-hidden">
      Explore Our Courses
      <div className="reflection absolute inset-0 bg-gray-300 opacity-20"></div>
    </button>
  </div>


      </div>
    </div>
  );
}

export default HomeMain;
