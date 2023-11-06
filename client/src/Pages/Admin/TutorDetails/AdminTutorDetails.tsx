import React from 'react'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'
import TutorTable from '../../../Components/Admin/TutorTable/TutorTable'



function AdminTutorDetails() {
  return (
    <div className="bg-blue-gray-700 h-screen">
        <AdminNavbar/>
       
        <div className="mt-5 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
            <TutorTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
        

  )
}

export default AdminTutorDetails
