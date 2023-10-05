import React from "react";
import TutorCard from "../../../Components/User/TutorsList/TutorCard";
import Navbar from "../../../Components/User/Navbar/Navbar";

function TutorView() {
  return (
    <div>
      <Navbar />
      <div className="mt-5 px-2 lg:px-0">
        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <TutorCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorView;
