import React from 'react'
import Courses from '../../../Components/Tutor/TutorHome/Courses'
import Navbars from '../../../Components/Tutor/TutorHome/Navbars'
import Footers from '../../../Components/User/Footer/Footers'

function My_courses() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
      <div className="flex justify-center items-center ">
        <div className="w-full  p-4 mb-9">
        <Courses /> 
      </div>
      </div>
     <div className='pt-10'>
     <Footers/>

     </div>
    </div>
  )
}

export default My_courses