import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";

interface TutorDetails {
  photo: string;
  tutorName: string;
  description: string;
  tutorEmail: string; 
  phone: string; 
}


function TutorSingleView({tutorId}:any) {


  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    photo: "",
    tutorName: "",
    description: "",
    tutorEmail: "", 
    phone: "", 
  });

  useEffect(() => {
    // Fetch tutor details using the tutorId
    axios
      .get(`${UserBaseUrl}/tutor/${tutorId}`)
      .then((response) => {
        console.log(response,"tutorById");
        setTutorDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tutorId]);
  return (
    <div className="bg-brown-400 p-10 flex flex-col items-center justify-center rounded-lg shadow-lg">
  <div className="mx-auto w-32 h-32 bg-white rounded-full overflow-hidden">
    <img className="w-full h-full object-cover" src={tutorDetails.photo} alt={tutorDetails.tutorName} />
  </div>
  <h2 className="text-white text-2xl font-bold mt-4 p-4">{tutorDetails?.tutorName}</h2>
  <p className="text-white text-sm p-4">Email: {tutorDetails?.tutorEmail}</p>
  <p className="text-white text-sm">Phone: {tutorDetails?.phone}</p>
  {/* Add more fields as needed to display the tutor's details */}
</div>
  )
}

export default TutorSingleView;
