import React from 'react'
import Navbars from '../../../Components/User/Navbar/Navbars'
import SignUps from '../../../Components/User/SignUp/SignUps'
import Footers from '../../../Components/User/Footer/Footers'
import ParticlesComponent from '../../../Components/User/HomeMain/config/Particlesconfig'

function SignUp() {
    return (
        <div className="dark:bg-black bg-base-200 ">
        <Navbars />
          <ParticlesComponent id="uniqueParticlesId" />
        <div className="lg:px-0">
           
           <SignUps/>
          
         </div>
          
    
        <Footers/>
        </div>
      )
}

export default SignUp
