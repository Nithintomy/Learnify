import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Add_Lesson from '../../../Components/Tutor/TutorHome/Add_Lesson'

function Add_Lessons() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center bg-orange-100">
  <div className="w-full max-w-4xl p-4 mb-9">
    <Add_Lesson />
  </div>
</div>
    </div>
  );
}

export default Add_Lessons
