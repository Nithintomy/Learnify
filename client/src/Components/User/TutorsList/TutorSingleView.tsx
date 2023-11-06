import React from 'react'


function TutorSingleView() {
  return (

    <div className="bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-opacity-80 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="text-center">
           
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
              About Me
            </h1>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              I am a passionate instructor with a strong background in Computer Science. My goal is to help students understand complex concepts in a simple and engaging way. I specialize in teaching Mathematics, Computer Science, and Physics.
            </p>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h1>
            <p className="text-gray-700 dark:text-gray-400">reactjs, nodejs, mongodb, express</p>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Qualification</h1>
            <p className="text-gray-700 dark:text-gray-400">Bsc computer science</p>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Experience</h1>
            <p className="text-gray-700 dark:text-gray-400">1 year</p>
          </div>
        </div>
      </div>
    </div>
  );


}

export default TutorSingleView
