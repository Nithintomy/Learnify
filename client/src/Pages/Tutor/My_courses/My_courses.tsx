import React from 'react'
import Courses from '../../../Components/Tutor/TutorHome/Courses'
import Navbars from '../../../Components/Tutor/TutorHome/Navbars'

function My_courses() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
      <div className="px-3 lg:px-3 flex flex-wrap  m-8">
        <Courses /> 
      </div>
    </div>
  )
}

export default My_courses