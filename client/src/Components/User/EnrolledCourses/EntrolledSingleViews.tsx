import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../Chat/Chat";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import { RingLoader } from "react-spinners";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ChatIcon from "@mui/icons-material/Chat";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  categoryId: string;
  video: string[];
  updatedAt: string;
}

function EntrolledSingleViews() {
  const location = useLocation();
  const courseDetails = location.state.courseDetails;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const courseId = courseDetails?.courseId?._id;
  const studentId = courseDetails?.studentId;

  console.log(courseDetails);

  useEffect(() => {
    axios
      .get(`${UserBaseUrl}/allLessons/${courseId}`)
      .then((response) => {
        setLessons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [courseId]);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePlayClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RingLoader
          loading={true}
          color="#000000"
          speedMultiplier={1}
          size={150}
        />
      </div>
    );
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex justify-center bg-white text-black shadow-2xl p-8 flex-wrap rounded-lg">
            <div className="lg:w-1/3 w-full h-64 overflow-hidden rounded-lg">
              <img
                className="object-cover object-center h-64 w-full"
                src={courseDetails?.courseId?.photo}
                alt="Course Image"
              />
            </div>
            <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {courseDetails?.courseId?.courseName}
              </h1>
              <h6 className="text-sm underline font-semibold text-gray-900 dark:text-white mb-4">
                Course Details
              </h6>
              <p className="leading-relaxed mb-4">
                {courseDetails?.courseId?.coursedescription}
              </p>
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2">
                  <p className="leading-loose">
                    <span className="font-semibold">Duration:</span>{" "}
                    {courseDetails?.courseId?.courseduration} hours
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="leading-loose">
                    <span className="font-semibold">Start Date:</span> April
                    8, 2024
                  </p>
                </div>
              </div>

              <h2 className="text-sm title-font text-gray-700 tracking-widest uppercase mb-4 flex items-center">
                <span className="mr-2">👩‍🏫</span>
                Tutor: {courseDetails?.tutorId?.tutorName}
              </h2>
             

              <div className="mt-4">
                <button className="text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded-lg">
                  Enrolled
                </button>
              </div>
              <span className="flex mt-4 items-center">
                <p className="text-black text-xs  mr-4">
                  If you have any doubts, chat with us
                </p>
                <button
                  className="btn"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  <ChatIcon className="text-blue-800" />
                </button>
              </span>
            </div>
          </div>

          <div className="w-4/5 mx-auto m-5">
            <h2 className="font-bold text-gray-800 mb-4 border-b-4 pb-2 text-xl font-bitter">
              LESSONS
            </h2>

            {lessons.map((lesson, index) => (
              <div key={lesson._id} className="mb-4 border">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between w-full p-4 text-black bg-white hover:bg-gray-100 focus:outline-none"
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
                    <p className="text-gray-700 mb-2">{lesson.description}</p>

                    <p className="mb-2">Duration: {lesson.duration} minutes</p>

                    <button
                      onClick={() => handlePlayClick(lesson.video[0])}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mb-2"
                    >
                      Play Now
                      <PlayCircleOutlineIcon className="ml-2" />
                    </button>

                    <p className="text-gray-600">
                      Updated At: {lesson.updatedAt}
                    </p>
                  </div>
                )}
              </div>
            ))}

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
          {/* Chat Modal */}

            <dialog
              id="my_modal_3"
              className="modal"
              open={isChatModalOpen}
              onClose={() => setIsChatModalOpen(false)}
            >
              <div className="modal-box w-4/5 h-4/5 flex justify-center items-center">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
                    onClick={() => setIsChatModalOpen(false)}
                  >
                    ✕
                  </button>
                </form>
                <Chat studentId={studentId} />
              </div>
            </dialog>
          </div>
      
      </section>
    </>
  );
}

export default EntrolledSingleViews;
