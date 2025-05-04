"use client";

import { useState } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ youtubeid }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePlayer = () => {
    setIsOpen((prev) => !prev);
  };

  const options = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const Player = () => (
    <div className="fixed bottom-4 right-4 w-[320px] h-[240px] p-4 bg-white rounded-lg shadow-lg z-50 transition-all">
      <button
        onClick={togglePlayer}
        className="absolute top-2 right-2 bg-gray-700 text-white text-sm px-2 py-1 rounded-full hover:bg-gray-900 transition cursor-pointer"
      >
        ✕
      </button>
      <YouTube
        videoId={youtubeid}
        opts={options}
        onReady={(e) => e.target.pauseVideo()}
        onError={() => alert("Video bermasalah, silakan coba yang lain.")}
      />
    </div>
  );

  const OpenButton = () => (
    <button
      onClick={togglePlayer}
      className="fixed bottom-5 right-5 w-36 h-12 bg-rose-500 text-white font-semibold rounded-lg shadow-xl hover:bg-rose-600 transition-all"
    >
      Tonton Trailer
    </button>
  );

  return isOpen ? <Player /> : <OpenButton />;
};

export default VideoPlayer;
