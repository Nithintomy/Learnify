import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Tutorprofile from '../../../Components/Tutor/TutorProfile/Tutorprofile'



function TutorProfile() {
    return (
        <div className=' dark:bg-black'>
    
        <Navbar/>
    
          <div className='px-3 lg:px-3 '>
            <Tutorprofile/>
               
          </div>
       
      </div>
      )
    }

export default TutorProfile
