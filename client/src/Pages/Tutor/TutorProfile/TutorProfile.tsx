import React from 'react'
import TutorProfiles from '../../../Components/Tutor/TutorProfile/TutorProfiles'
import Navbars from '../../../Components/Tutor/TutorHome/Navbars'
import Breadcrumbs from '../../../Components/common/Breadcrumbs'



function TutorProfile() {
    return (
      <div className="dark:bg-black bg-gray-200 h-screen">
    
        <Navbars/>
        <div className='ml-16'>
      <Breadcrumbs/>
      </div>
          <div className='px-3 lg:px-3 '>
            <TutorProfiles/>
               
          </div>
       
      </div>
      )
    }

export default TutorProfile
