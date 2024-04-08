import React from 'react';
import Lessons from './Lessons';


function CourseContent() {
  return (
    <div className="flex pb-10">
      {/* Left side */}
      <div className="w-screen ">
        <h4 className='text-center mb-4 text-3xl font-serif'>Course Lessons</h4>
        <Lessons />
      </div>

      
    </div>
  );
}

export default CourseContent;
