import React from 'react';
import Lessons from './Lessons';


function CourseContent() {
  return (
    <div className="flex mt-8 m-4">
      {/* Left side */}
      <div className="w-screen p-4">
        <h4 className='text-center p-5 text-3xl font-serif'>Course Lessons</h4>
        <Lessons />
      </div>

      
    </div>
  );
}

export default CourseContent;
