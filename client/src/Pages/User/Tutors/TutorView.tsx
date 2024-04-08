import React from "react";
import Navbars from "../../../Components/User/Navbar/Navbars";
import TutorCards from "../../../Components/User/TutorsList/TutorCards";

function TutorView() {
  return (
    <div className="dark:bg-black bg-base-200  h-screen dark:text-white">
      <Navbars />
      <div className=" px-2 lg:px-0">
        <div className="flex items-center justify-center py-5">
          <div className="max-w-screen-xl w-full overflow-x-auto px-4">
            <h2 className=" font-bold text-gray-800 mb-4 border-b-4 pb-2 text-3xl font uppercase dark:text-white">
              Our Expert Tutors
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-5/6 mx-auto">
              <TutorCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorView;
