import React, { useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player">
      <ReactPlayer url={url} controls width="100%" height="500px" />
    </div>
  );
};

export default VideoPlayer;
