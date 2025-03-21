import { useEffect, useState } from "react";
import { FaHome, FaSearch, FaSignOutAlt, FaPlay } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { spotify } from "../spotify";
import Player from "./Player";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    spotify.getMe().then((userData) => setUser(userData));
    spotify.getUserPlaylists().then((data) => setPlaylists(data.items));
  }, []);

  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    const data = await spotify.searchTracks(query);
    setSearchResults(data.tracks.items);
  };

  const playSong = (track) => {
    setCurrentTrack(track);
  };

  const nextTrack = () => {
    console.log("Next track clicked");
  };

  const prevTrack = () => {
    console.log("Previous track clicked");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Musify</h2>
        <ul>
          <li><FaHome /> Home</li>
          <li><FaSearch /> Search</li>
        </ul>
        <h3>Your Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
        <button onClick={() => signOut(auth)}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <input
          type="text"
          placeholder="Search for a song..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="search-results">
          {searchResults.map((track) => (
            <div key={track.id} className="track">
              <img src={track.album?.images?.[0]?.url || "default-image.jpg"} alt={track.name} />
              <div>
                <h4>{track.name}</h4>
                <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
              <button onClick={() => playSong(track)}>
                <FaPlay />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Music Player */}
      <Player track={currentTrack} onNext={nextTrack} onPrev={prevTrack} />
    </div>
  );
};

export default Dashboard;
