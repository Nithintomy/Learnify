import React from 'react'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'
import CategoryList from '../../../Components/Admin/Category/CategoryList'

function AllCategory() {
  return (
    <div>
      <AdminNavbar />
      <div className="mt-5 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <CategoryList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllCategory
