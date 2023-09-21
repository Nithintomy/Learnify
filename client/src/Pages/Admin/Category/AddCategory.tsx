import React from 'react'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'
import AddCategorys from '../../../Components/Admin/Category/AddCategory'

function AddCategory() {
  return (

    <div>
    <AdminNavbar />
    <div className="mt-5 px-2 lg:px-0">
      <div className="overflow-x-auto">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-5/6 mx-auto">
            <div className="bg-blue-800 p-4"> {/* Apply bg-blue-800 to the form or a containing element */}
              <AddCategorys />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default AddCategory
