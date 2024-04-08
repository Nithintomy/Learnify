import React from 'react'
import EnrolledCourses from '../../../Components/User/EnrolledCourses/EnrolledCourses'
import Navbars from '../../../Components/User/Navbar/Navbars'

function EntrolledCourse() {
  return (
    <div className='dark:bg-black bg-gray-200 h-full'>
    <Navbars/>
    <div className="px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-5/6 mx-auto mt-10">
            <EnrolledCourses />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EntrolledCourse
