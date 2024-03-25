import React from "react";
import { useParams } from "react-router-dom";
import Navbars from "../../../Components/User/Navbar/Navbars";
import TutorSingleViews from "../../../Components/User/TutorsList/TutorSingleViews";

function TutorDetails() {
  const { tutorId } = useParams();
  return (
    <div className="dark:bg-black bg-base-200 h-screen">
      <Navbars />

      <div className="px-3 mt-6">
        <TutorSingleViews tutorId={tutorId} />
      </div>
    </div>
  );
}

export default TutorDetails;
