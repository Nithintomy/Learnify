import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import EnrolledCourses from '../../../Components/User/EnrolledCourses/EnrolledCourses'

function EntrolledCourse() {
  return (
    <div className='dark:bg-black h-screen'>
    <Navbar/>
    <div className="mt-5 px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-5/6 mx-auto mt-28">
            <EnrolledCourses />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EntrolledCourse
