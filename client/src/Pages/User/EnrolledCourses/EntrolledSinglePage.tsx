import React from 'react'
import Navbars from '../../../Components/User/Navbar/Navbars'
import EntrolledSingleViews from '../../../Components/User/EnrolledCourses/EntrolledSingleViews'

function EntrolledSinglePage() {
  return (
    <div className="bg-gray-200 py-5">

    <Navbars/>

    <div className="px-3 ">
       <EntrolledSingleViews/> 
       
     </div>
     </div>
     
  )
}

export default EntrolledSinglePage
