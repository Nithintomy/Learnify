import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Students from '../../../Components/Tutor/TutorHome/Students'


function My_students() {
  return (
    <div>
     <Navbar/>
     <div className='px-3 lg:px-3 '>
     <Students/>
            
        </div>
      
    </div>
  )
}

export default My_students
