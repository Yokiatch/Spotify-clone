import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 backdrop-blur-md text-white p-4 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src={song?.image || "/images/liked-songs.jpg"}
          alt="Current Song"
          className="w-12 h-12 rounded-md"
        />
        <div>
          <h3 className="text-sm font-semibold">{song?.name || "Song Name"}</h3>
          <p className="text-xs text-gray-400">{song?.artist || "Artist Name"}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center space-x-6">
        <SkipBack className="cursor-pointer hover:text-green-500" />
        {isPlaying ? (
          <Pause className="cursor-pointer hover:text-green-500 text-3xl" onClick={() => setIsPlaying(false)} />
        ) : (
          <Play className="cursor-pointer hover:text-green-500 text-3xl" onClick={() => setIsPlaying(true)} />
        )}
        <SkipForward className="cursor-pointer hover:text-green-500" />
      </div>

      {/* Progress Bar */}
      <div className="w-1/3 h-1 bg-gray-600 rounded-full relative">
        <div className="h-1 bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
