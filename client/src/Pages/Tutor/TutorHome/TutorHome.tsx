import React from 'react'
import TutorDashboard from '../../../Components/Tutor/TutorDashboard/TutorDashboard'
import Navbars from '../../../Components/Tutor/TutorHome/Navbars'

function TutorHome() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
  
   <TutorDashboard/>

</div>

  )
}

export default TutorHome
