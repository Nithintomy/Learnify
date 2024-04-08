import React from 'react'
import CourseContent from '../../../Components/Tutor/TutorHome/CourseContent'
import Navbars from '../../../Components/Tutor/TutorHome/Navbars'
import SingleViews from '../../../Components/Tutor/TutorHome/SingleViews'
import Breadcrumbs from '../../../Components/common/Breadcrumbs'


function SinglePages() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
     <Navbars/>

     <div className='ml-16'>
      <Breadcrumbs/>
      </div>

     <div className="px-3 lg:px-3 mt-6">
        <SingleViews/> 
        
      </div>
    
        <CourseContent/>

       
    </div>
  )
}

export default SinglePages
