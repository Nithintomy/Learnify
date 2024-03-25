import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'

import Navbars from '../../../Components/Tutor/TutorHome/Navbars';
import AddLesson from '../../../Components/Tutor/TutorHome/AddLesson';
import Breadcrumbs from '../../../Components/common/Breadcrumbs';

function Add_Lessons() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
      <div className='ml-16'>
      <Breadcrumbs/>
      </div>
      <div className="flex justify-center items-center">
  <div className="w-full max-w-4xl p-4 mb-9">
    <AddLesson />
  </div>
</div>
    </div>
  );
}

export default Add_Lessons
