import React from "react";
import Navbar from "../../../Components/Tutor/TutorHome/Navbar";
import Students from "../../../Components/Tutor/TutorHome/Students";

function My_students() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center bg-orange-100 ">
        <div className="w-full max-w-4xl p-4 mb-9">
          <Students />
        </div>
      </div>
    </div>
  );
}

export default My_students;
