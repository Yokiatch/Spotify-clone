import { Link } from "react-router-dom";
import { logout } from "../firebase";
import { Home, Library, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Spotify Clone</h1>
      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-green-500">Home</li>
        <li className="cursor-pointer hover:text-green-500">Search</li>
        <li className="cursor-pointer hover:text-green-500">Your Library</li>
      </ul>
      <div className="mt-auto">
        <h2 className="text-sm text-gray-400 mb-2">Playlists</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-green-500">Liked Songs</li>
          <li className="cursor-pointer hover:text-green-500">Discover Weekly</li>
        </ul>
      </div>
    </div>
  );
};


export default Sidebar;
