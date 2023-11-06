import React from 'react'
import SinglePageView from '../../../Components/User/SinglePage/SinglePageView'
import Navbar from '../../../Components/User/Navbar/Navbar'
import RatingComponent from '../../../Components/User/Rating/Rating'
import { useParams } from "react-router-dom";

function SingleView() {
  const { courseId } = useParams();
  return (

         <div>
     <Navbar/>

     <div className="px-3 mt-6">
        <SinglePageView/> 
        
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Course Ratings and Comments</h2>
        <RatingComponent courseId={courseId || ''} />
      </div>
    </div>
      

  )
}

export default SingleView
