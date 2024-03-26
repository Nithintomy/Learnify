import React from "react";
import Navbars from "../../../Components/Tutor/TutorHome/Navbars";
import StudentTable from "../../../Components/Tutor/TutorHome/StudentTable";

function My_students() {
  return (
    <div className="dark:bg-black bg-gray-200 h-full">
      <Navbars/>
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-6xl p-4 mb-9">
          <StudentTable />
        </div>
      </div>
    </div>
  );
}

export default My_students;
