import React from 'react'
import Logins from '../../../Components/User/Login/Logins'
import Footers from '../../../Components/User/Footer/Footers'
import ParticlesComponent from '../../../Components/User/HomeMain/config/Particlesconfig'
import DefaultNavbar from '../../../Components/common/DefaultNavbar'

function Login() {
  return (
    <div className="dark:bg-black bg-base-200 ">
    <DefaultNavbar />
    <ParticlesComponent id="uniqueParticlesId" />

    <div className="lg:px-0">
       
       <Logins/>
      
     </div>
      

    <Footers/>
    </div>
  )
}

export default Login
