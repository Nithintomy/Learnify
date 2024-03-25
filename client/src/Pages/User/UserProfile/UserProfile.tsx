import React from 'react'
import Navbars from '../../../Components/User/Navbar/Navbars'
import AboutSection from '../../../Components/User/userProfile/UserProfiles'

function UserProfile() {
  return (
    <div className=' dark:bg-black bg-gray-200'>

    <Navbars/>

  <div className='px-3  lg:px-3 border border-gray-200 rounded-lg shadow-md dark:bg-black '>
    <AboutSection/>
  </div>
  
   
  </div>
  )
}

export default UserProfile
