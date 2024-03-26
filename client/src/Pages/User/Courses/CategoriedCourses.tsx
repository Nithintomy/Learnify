
import React from 'react'
import { CoursesByCategory } from '../../../Components/User/Courses/CoursesByCategory'
import Navbars from '../../../Components/User/Navbar/Navbars'
import Footers from '../../../Components/User/Footer/Footers'

function CategoriedCourses() {
  return (
    <div className='dark:bg-black bg-gray-200'>
      <Navbars/>
      <div className="mt-20 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <CoursesByCategory />
            </div>
          </div>
          <div className='mt-5'>
            <Footers/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriedCourses
