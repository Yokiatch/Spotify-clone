import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const MusicPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 backdrop-blur-md text-white p-4 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src="/images/liked-songs.jpg"
          alt="Current Song"
          className="w-12 h-12 rounded-md"
        />
        <div>
          <h3 className="text-sm font-semibold">Song Name</h3>
          <p className="text-xs text-gray-400">Artist Name</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center space-x-6">
        <SkipBack className="cursor-pointer hover:text-green-500" />
        <Play className="cursor-pointer hover:text-green-500 text-3xl" />
        <SkipForward className="cursor-pointer hover:text-green-500" />
      </div>

      {/* Progress Bar */}
      <div className="w-1/3 h-1 bg-gray-600 rounded-full relative">
        <div className="w-1/4 h-1 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
