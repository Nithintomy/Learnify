import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Courses from '../../../Components/Tutor/TutorHome/Courses'

function My_courses() {
  return (
    <div>
      <Navbar />
      <div className="px-3 lg:px-3 flex flex-wrap">
        <Courses />
      </div>
    </div>
  )
}

export default My_courses