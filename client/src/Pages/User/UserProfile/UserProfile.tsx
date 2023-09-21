import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import Profile from '../../../Components/User/userProfile/Profile'

function UserProfile() {
  return (
    <div className=' dark:bg-black'>

    <Navbar/>

      <div className='px-3 lg:px-3 '>
        <Profile/>
           
      </div>
   
  </div>
  )
}

export default UserProfile
