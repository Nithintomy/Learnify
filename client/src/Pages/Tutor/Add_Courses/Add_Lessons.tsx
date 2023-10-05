import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Add_Lesson from '../../../Components/Tutor/TutorHome/Add_Lesson'

function Add_Lessons() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center bg-blue-gray-100">
        <div className="w-full max-w-xs p-4">
          <Add_Lesson />
        </div>
      </div>
    </div>
  );
}

export default Add_Lessons
