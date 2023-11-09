import React from "react";
import TutorCard from "../../../Components/User/TutorsList/TutorCard";
import Navbar from "../../../Components/User/Navbar/Navbar";

function TutorView() {
  return (
    <div className="dark:bg-black">
      <Navbar />
      <div className="mt-28 px-2 lg:px-0">
        
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white ml-24 m-14">Our Expert Tutors</h1>
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
