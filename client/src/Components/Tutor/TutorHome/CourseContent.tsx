import React from 'react';
import Lessons from './Lessons';


function CourseContent() {
  return (
    <div className="flex mt-8 m-4">
      {/* Left side */}
      <div className="w-3/4 p-4 bg-blue-gray-100">
        <h4 className='text-center p-5 text-3xl font-serif'>Course Content</h4>
        <Lessons />
      </div>

      {/* Right side with black background */}
      <div className="w-1/3 bg-black  text-lg">
           <h3 className='text-white text-center pt-5 font-serif'>Tutor Details</h3>
      </div>
    </div>
  );
}

export default CourseContent;
