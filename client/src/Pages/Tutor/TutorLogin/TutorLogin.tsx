import React from 'react'
import TutorLogins from '../../../Components/Tutor/Login/TutorLogins'
import Footers from '../../../Components/User/Footer/Footers'
import ParticlesComponent from '../../../Components/User/HomeMain/config/Particlesconfig'
import DefaultNavbar from '../../../Components/common/DefaultNavbar'

function TutorLogin() {
  return (
    <div className="bg-base-200 dark:bg-black  ">
        <DefaultNavbar />
          <ParticlesComponent id="uniqueParticlesId" />
        <div className="lg:px-0 dark:bg-black">
           
           <TutorLogins/>
          
         </div>
          
    
        <Footers/>
        </div>
  )
}

export default TutorLogin
