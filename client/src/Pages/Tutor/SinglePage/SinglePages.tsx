import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import SingleView from '../../../Components/Tutor/TutorHome/SingleView'
import CourseContent from '../../../Components/Tutor/TutorHome/CourseContent'


function SinglePages() {
  return (
    <div>
     <Navbar/>

     <div className="px-3 lg:px-3 flex flex-wrap mt-6">
        <SingleView/> 
        
      </div>
    
        <CourseContent/>

       
    </div>
  )
}

export default SinglePages
