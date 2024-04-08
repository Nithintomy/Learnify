import React from 'react'
import Footers from '../../../Components/User/Footer/Footers'
import Navbars from '../../../Components/User/Navbar/Navbars'
import ParticlesComponent from '../../../Components/User/HomeMain/config/Particlesconfig'
import TutorSignups from '../../../Components/Tutor/SignUp/TutorSignups'


function TutorSignup() {
  return (
    <div className="dark:bg-black bg-base-200 ">
    <Navbars />
      <ParticlesComponent id="uniqueParticlesId" />
    <div className="lg:px-0">
       
       <TutorSignups/>
      
     </div>
      

    <Footers/>
    </div>
  )
}

export default TutorSignup
