import React from 'react';
import './Companies.css';
import Android from '../../../assets/Android.png';
import Docker from '../../../assets/Docker.png';
import Java from '../../../assets/Java.png';
import JavaScript from '../../../assets/JavaScript.png';
import Python from '../../../assets/Python.png';
import Reactjs from '../../../assets/React-JS.png';
import Angular from '../../../assets/Angular.jpg';
import Dart from '../../../assets/Dart.png';

function OurCourses() {
  // Define an array of courses with their images and names
  const courses = [
    { image: Java, name: 'Java' },
    { image: Docker, name: 'Docker' },
    { image: JavaScript, name: 'JavaScript' },
    { image: Python, name: 'Python' },
    { image: Reactjs, name: 'Reactjs' },
    { image: Angular, name: 'Angular' },
    { image: Android, name: 'Android' },
    { image: Dart, name: 'Dart' },
 
  ];

  return (
    <div className="bg-gray-100 py-8 ">
       <div className="max-w-screen-xl mx-auto px-4 justify-center ">
        <h2 className=" font-bold text-gray-800 mb-6 border-b-4 pb-2 text-3xl font-bitter">Popular Courses</h2>
        <div className="flex items-center space-x-4 overflow-x-auto">
          {/* Map over the courses array */}
          {courses.map((course, index) => (
            <div key={index} className="flex flex-col items-center justify-center w-28 h-25 bg-gray-50 rounded-full p-4">
              <img
                src={course.image}
                alt={course.name}
                className="w-12 h-12  object-cover mb-2"
              />
              <p className="text-gray-800 text-center font-semibold">{course.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurCourses;
