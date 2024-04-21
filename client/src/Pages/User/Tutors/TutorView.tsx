import React from "react";
import Navbars from "../../../Components/User/Navbar/Navbars";
import TutorCard from "../../../Components/User/TutorsList/TutorCard";

function TutorView() {
  return (
    <div className="dark:bg-black bg-base-200 min-h-screen dark:text-white">
      <Navbars />
      <div className="px-2 lg:px-0 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="font-bold text-gray-800 mb-4 border-b-4 pb-2 text-3xl font uppercase dark:text-white">
            Our Expert Tutors
          </h2>
        </div>

        <div className="max-w-screen-xl mx-auto overflow-x-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <TutorCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorView;
