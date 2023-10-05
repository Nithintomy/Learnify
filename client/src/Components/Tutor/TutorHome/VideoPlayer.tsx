import React, { useState } from 'react';

type VideoPlayerProps = {
  videoUrl: string;
  onClose: () => void;
};

function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-3/4 h-3/4">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={() => onClose()} // Call onClose when the button is clicked
        >
          X
        </button>
        <video controls width="100%" height="100%">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;
