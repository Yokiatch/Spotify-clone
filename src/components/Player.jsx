import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

const Player = ({ track, onNext, onPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(track?.preview_url));

  useEffect(() => {
    if (track) {
      audioRef.current.src = track.preview_url;
      setIsPlaying(false);
    }
  }, [track]);

  const togglePlay = () => {
    if (!track?.preview_url) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      {track ? (
        <>
          <img src={track.album.images[0]?.url} alt={track.name} className="track-img" />
          <div className="track-info">
            <h4>{track.name}</h4>
            <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
          <div className="controls">
            <button onClick={onPrev}><FaStepBackward /></button>
            <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
            <button onClick={onNext}><FaStepForward /></button>
          </div>
        </>
      ) : (
        <p>No track playing</p>
      )}
    </div>
  );
};

export default Player;
