
import React from 'react'
import { AdminNavbar } from '../../../Components/Admin/Navbar/Navbar'
import DashboardView from '../../../Components/Admin/DashBoardView/DashboardView'


function Dashboard() {
  return (
    <div className='bg-gray-400'>
        <AdminNavbar/>

        <div>
          <DashboardView/>
        </div>
  
    </div>
  )
}

export default Dashboard
