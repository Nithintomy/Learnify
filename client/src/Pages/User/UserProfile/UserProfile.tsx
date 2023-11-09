import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import Profile from '../../../Components/User/userProfile/Profile'

function UserProfile() {
  return (
    <div className=' dark:bg-black'>

    <Navbar/>

      <div className='px-3 mt-24 lg:px-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-black '>
        <Profile/>
           
      </div>
   
  </div>
  )
}

export default UserProfile
