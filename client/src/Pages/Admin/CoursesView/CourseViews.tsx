import React from 'react'
import AdminCourse from '../../../Components/Admin/AdminCourseList/AdminCourse'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'

function CourseViews() {
  return (
    <div className="bg-blue-gray-700 h-screen">
      <AdminNavbar />
      <div className="mt-5 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
            <AdminCourse/>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default CourseViews
