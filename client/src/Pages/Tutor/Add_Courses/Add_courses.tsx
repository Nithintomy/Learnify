import React from 'react';
import Navbars from '../../../Components/Tutor/TutorHome/Navbars';
import Add_Courses from '../../../Components/Tutor/TutorHome/Add_Courses';
import Breadcrumbs from '../../../Components/common/Breadcrumbs';


function Add_courses() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
      <div className='ml-16'>
      <Breadcrumbs/>
      </div>
      <div className="flex justify-center items-center">
     
        <div className="w-full max-w-4xl p-4">
          
          <Add_Courses />
        </div>
      </div>
    </div>
  );
}

export default Add_courses;
