import React, { useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';


import './style.css';

const VideoPlayer = props => {
  const [playVideo, setPlayVideo] = useState(false);
  const videRef = useRef();
  const handleVideo = () => {
    setPlayVideo((prevPlayVideo) => !prevPlayVideo);

    if (playVideo) {
      videRef.current.pause();
    } else {
      videRef.current.play();
    }
  };
  return (
    <div className="app_video grid">
      <div className="app_video-video">
        <video
          src={props.url}
          ref={videRef}
          type="video/mp4"
          loop
          controls={false}
        />
      </div>
      <div className="app_video-overlay">
        <div className="app_video-overlay_container flex flex__center">
          <div onClick={handleVideo} className="app_video-overlay_circle flex flex__center">
            {playVideo ? <BsPauseFill color="#fff" fontSize={45} /> : <BsFillPlayFill color="#fff" fontSize={45} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
