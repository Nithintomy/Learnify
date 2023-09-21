import React from 'react'
import Navbar from '../../../Components/Tutor/TutorHome/Navbar'
import Add_Course from '../../../Components/Tutor/TutorHome/Add_Course';




function Add_courses() {
    return (
      <div>
        <Navbar />
        <div className="px-2 lg:px-0 flex justify-center items-center h-screen">
          <div className="overflow-x-auto">
            <div className="max-w-screen-xl mx-auto">
              <div className="max-w-5/6 mx-auto">
               <Add_Course/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Add_courses
