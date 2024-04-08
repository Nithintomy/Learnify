import React from 'react'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'
import Orders from '../../../Components/Admin/Orders/Orders'

function OrderDetails() {
  return (
    <div className="bg-gray-400 h-screen text-black">
    <AdminNavbar/>
   
    <div className="mt-5 px-2 lg:px-0">
    <div className="overflow-x-auto">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-5/6 mx-auto">
        <Orders/>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default OrderDetails
