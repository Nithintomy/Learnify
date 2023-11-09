
import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import { CoursesByCategory } from '../../../Components/User/Courses/CoursesByCategory'
import Footer from '../../../Components/User/Footer/Footer'

function CategoriedCourses() {
  return (
    <div className='dark:bg-black'>
      <Navbar/>
      <div className="mt-20 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <CoursesByCategory />
            </div>
          </div>
          <div className='mt-5 px-2'>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriedCourses
