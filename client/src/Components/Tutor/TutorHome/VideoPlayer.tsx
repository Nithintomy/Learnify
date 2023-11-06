import React, { useState, useRef, useEffect } from 'react';


type VideoPlayerProps = {
  videoUrl: string;
  onClose: () => void;
};

function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnded);
      return () => {
        videoRef.current!.removeEventListener('ended', handleVideoEnded);
      };
    } 
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleCloseClick = () => {
    onClose();

  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-4/5 h-4/5">
        <button
          className="absolute top-2 right-2 text-white text-2xl cursor-pointer z-10"
          onClick={handleCloseClick}
        >
          X
        </button>
        <video
          controls
          width="100%"
          height="100%"
          ref={videoRef}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video.
        </video>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ display: isPlaying ? 'none' : 'block' }}
        >
          <button
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-full"
            onClick={togglePlay}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
