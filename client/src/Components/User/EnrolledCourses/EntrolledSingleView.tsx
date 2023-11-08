import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '../Chat/Chat';
import axios from 'axios';
import { UserBaseUrl } from '../../../Api';
import VideoPlayer from '../../Tutor/TutorHome/VideoPlayer';


interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  categoryId: string;
  video: string[];
  updatedAt: string;
}

function EntrolledSingleView() {
  const location =useLocation()
  const courseDetails = location.state.courseDetails;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const courseId =courseDetails?.courseId?._id
  const studentId =courseDetails?.studentId
  const tutorId = courseDetails?.tutorId


  console.log(courseId,"courseId")

  useEffect(() => {
    
    axios.get(`${UserBaseUrl}/allLessons/${courseId}`)
    .then((response) => {
      setLessons(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  },[courseId])


  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };


  const toggleChat = () => {
    setShowChatModal(!showChatModal);
  };
  
  const handlePlayClick = (videoUrl: string, index: number) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    console.log("hai")
    window.location.reload()
    setCurrentVideoUrl('');
    setShowVideoModal(false);
  };



  return (
    <>
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-black via-gray-600 to-deep-orange-500 hover:bg-opacity-80 dark:bg-gray-800 dark:hover:bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
    {/* Right Side: Course Image */}
    <div className="md:w-1/2">
      <img
        src={courseDetails?.courseId?.photo}
        alt="Course Image"
        className="w-96 h-72"
      />
    </div>

    {/* Left Side: Course Details */}
    <div className="flex flex-col justify-between p-6 md:w-1/2">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {courseDetails?.courseId?.courseName}
      </h5>
      <p className="mb-3 font-normal text-black dark:text-gray-400">
      {courseDetails?.courseId?.coursedescription}
      </p>
      {/* Add your course details section here */}

      <div className="mb-3">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
          Course Details
        </h6>
        <ul className="list-disc ml-6">
          <li>{courseDetails?.courseId?.courseduration} hours</li>
          <li>Start Date: October 1, 2023</li>
          <li>Course Fee: $ {courseDetails?.courseId?.courseFee} </li>
          
        </ul>
        <p>
      </p>
  
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
       Enrolled
      </button>
     

    </div>
   
  </div>

  <div className="max-w-lg mx-auto m-5">
        {lessons.length === 0 ? (
          <p className="text-center text-xl text-gray-700 dark:text-gray-400">
            Currently, there are no lessons available.
          </p>
        ) : (
          lessons.slice(0, 1).map((lesson, index) => (
            <div key={lesson._id} className="mb-4 border rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between w-full p-4 bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                <span className="text-lg font-semibold">{lesson.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform transform ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700">{lesson.description}</p>
                  <p>Duration: {lesson.duration} minutes</p>
                  <p>Category: {lesson.categoryId}</p>
                  <button
                    onClick={() => handlePlayClick(lesson.video[0], index)}
                    className="bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
                  >
                    Play Now
                  </button>
                  <p>updatedAt: {lesson.updatedAt}</p>
                </div>
              )}
            </div>
          ))
        )}
        {showVideoModal && (
          <VideoPlayer videoUrl={currentVideoUrl} onClose={handleCloseVideoModal} />
        )}
      </div>

<button
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
      onClick={toggleChat}
    >
      Chat with Cock
    </button>

    {showChatModal  && <Chat studentId={studentId}/>} 
   

  </>

  )
}

export default EntrolledSingleView
