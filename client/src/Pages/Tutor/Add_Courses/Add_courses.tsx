import React from 'react';
import Navbar from '../../../Components/Tutor/TutorHome/Navbar';
import Add_Course from '../../../Components/Tutor/TutorHome/Add_Course';

function Add_courses() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center bg-orange-100">
        <div className="w-full max-w-4xl p-4">
          <Add_Course />
        </div>
      </div>
    </div>
  );
}

export default Add_courses;
