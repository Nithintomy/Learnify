import React from 'react'
import AdminLogins from '../../../Components/Admin/AdminLogin/AdminLogins'
import Footers from '../../../Components/User/Footer/Footers'
import AdminParticle from '../../../Components/User/HomeMain/config/AdminParticle'
import DefaultNavbar from '../../../Components/common/DefaultNavbar'

function AdminLogin() {
  return (
    <div className="dark:bg-black bg-gray-200">
    <DefaultNavbar />
    <AdminParticle id="uniqueParticlesId" />

    <div className="lg:px-0">
       
       <AdminLogins/>
      
     </div>
      

    <Footers/>
    </div>
  )
}

export default AdminLogin
