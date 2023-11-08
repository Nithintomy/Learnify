
import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import TutorSingleView from '../../../Components/User/TutorsList/TutorSingleView'
import { useParams } from "react-router-dom";

function TutorDetails() {

  const { tutorId } = useParams();
  return (
    <div>

     <Navbar/>

     <div className="px-3 mt-6">
        <TutorSingleView tutorId={tutorId}/> 
        
      </div>



      
    </div>
  )
}

export default TutorDetails
