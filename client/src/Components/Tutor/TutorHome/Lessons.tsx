import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLesson } from '../../../features/tutorSlice/courseSlice';
import VideoPlayer from './VideoPlayer';

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const lessons = useSelector(selectLesson);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
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
    <div className="max-w-lg mx-auto">
      {lessons.map((lesson, index) => (
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
              <p>Category: {lesson.category}</p>
              {/* Improved button styling */}
              <button
                onClick={() => handlePlayClick(lesson.video, index)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              >
                Play Now
              </button>
              <p>updatedAt: {lesson.updatedAt}</p>
            </div>
          )}
        </div>
      ))}

      {showVideoModal && (
        <VideoPlayer videoUrl={currentVideoUrl} onClose={handleCloseVideoModal} />
      )}
    </div>
  );
}

export default Accordion;
