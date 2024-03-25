import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../Chat/Chat";
import axios from "axios";
import { UserBaseUrl } from "../../../Api";
import VideoPlayer from "../../Tutor/TutorHome/VideoPlayer";
import robot from "../../../assets/robot.gif";
import { RingLoader } from "react-spinners";

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
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
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
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const toggleChat = () => {
    setShowChatModal(!showChatModal);
  };

  const handlePlayClick = (videoUrl: string, _index: number) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    console.log("hai");
    window.location.reload();
    setCurrentVideoUrl("");
    setShowVideoModal(false);
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
                className="object-cover object-center h-48 w-full"
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
                    <span className="font-semibold">Start Date:</span> October
                    1, 2023
                  </p>
                </div>
              </div>
              <h2 className="text-sm title-font text-gray-700 tracking-widest uppercase mb-4 flex items-center">
                <span className="mr-2">👩‍🏫</span>
                Tutor: {courseDetails?.tutorId?.tutorName}
              </h2>

              <div className="mt-4">
                <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">
                  Enrolled
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-lg mx-auto m-5">
            <h2 className=" font-bold text-gray-800 mb-4 border-b-4 pb-2 text-xl font-bitter">
              LESSONS
            </h2>

            {lessons.slice(0, 1).map((lesson, index) => (
              <div key={lesson._id} className="mb-4 border rounded-lg">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between w-full p-4 text-black bg-white hover:bg-gray-500 focus:outline-none"
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
                    <p className="text-gray-700">{lesson.description}</p>
                    <p>Duration: {lesson.duration} minutes</p>

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
            ))}
            {showVideoModal && (
              <VideoPlayer
                videoUrl={currentVideoUrl}
                onClose={handleCloseVideoModal}
              />
            )}
            {showVideoModal && (
              <VideoPlayer
                videoUrl={currentVideoUrl}
                onClose={handleCloseVideoModal}
              />
            )}
          </div>

          <img
            src={robot}
            alt="Robot"
            className="w-1/4 h-1/4 ml-auto cursor-pointer"
            onClick={() => {
              toggleChat();
            }}
          />

          {showChatModal && <Chat studentId={studentId} />}
        </div>
      </section>
    </>
  );
}

export default EntrolledSingleViews;
