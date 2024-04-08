import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLesson } from "../../../features/tutorSlice/courseSlice";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const lessons = useSelector(selectLesson);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handlePlayClick = (videoUrl: string, _index: number) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };



  return (
    
    <div className="w-4/5 mx-auto m-5">
  
      {lessons.length === 0 ? (
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">Lessons</div>
          <div className="collapse-content">
            <h1 className="text-xl font-bold flex justify-center ">
              No Lesson Found
            </h1>
          </div>
        </div>
      ) : (
        lessons.map((lesson, index) => (
          <div key={lesson._id} className="mb-2 border rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between w-full p-4 bg-white hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-lg font-semibold">{lesson.title}</span>
              <svg
                className={`w-5 h-5 transition-transform transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
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
                <p className="text-black text-lg font-semibold">{lesson.description}</p>
                <p>Duration: {lesson.duration} minutes</p>
                {/* Improved button styling */}
                <button
                  onClick={() => handlePlayClick(lesson.video, index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
                >
                  Play Now
                  <PlayCircleOutlineIcon className="ml-2"/>
                </button>
                <p>updatedAt: {lesson.updatedAt}</p>
              </div>
            )}
          </div>
        ))
      )}
  {/* Video Modal */}
  {showVideoModal && (
              <dialog open id="my_modal_4" className="modal">
                <div className="modal-box w-4/5 h-4/5 flex justify-center items-center">
                  <form method="dialog">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
                      onClick={() => setShowVideoModal(false)}
                    >
                      ✕
                    </button>
                  </form>
                  <video
                    controls
                    width="100%"
                    height="100%"
                    src={currentVideoUrl}
                    autoPlay={isPlaying}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  >
                    Your browser does not support the video.
                  </video>
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ display: isPlaying ? "none" : "block" }}
                  ></div>
                </div>
              </dialog>
            )}
    
    </div>
  );
}

export default Accordion;
