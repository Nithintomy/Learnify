import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import EntrolledSingleView from '../../../Components/User/EnrolledCourses/EntrolledSingleView'

function EntrolledSinglePage() {
  return (
    <div>
    <Navbar/>

    <div className="px-3 mt-40">
       <EntrolledSingleView/> 
       
     </div>
     </div>
     
  )
}

export default EntrolledSinglePage
