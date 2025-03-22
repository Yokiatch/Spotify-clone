import { useEffect, useState } from "react";
import { FaHome, FaSearch, FaSignOutAlt, FaPlay } from "react-icons/fa";
import { auth, logout } from "../firebase";
import { spotify, AUTH_URL } from "../spotify";
import Player from "./Player";
import "./Dashboard.css";
import SpotifyPlayer from "./SpotifyPlayer.jsx";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("spotify_token") || "");

  useEffect(() => {
    if (!token) {
      console.error("Spotify access token is missing!");
      window.location.href = AUTH_URL; // Redirect to login
      return;
    }

    spotify.setAccessToken(token);

    spotify.getMe()
      .then((userData) => {
        console.log("User Data:", userData);
        setUser(userData);
      })
      .catch((err) => console.error("Error fetching user data:", err));

    spotify.getUserPlaylists()
      .then((data) => {
        console.log("Playlists Data:", data);
        setPlaylists(data.items || []);
      })
      .catch((error) => console.error("Error fetching playlists:", error));
  }, [token]);

  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);

    try {
      const data = await spotify.searchTracks(query);
      console.log("Search Results:", data);
      setSearchResults(data.tracks.items || []);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  const playSong = (track) => {
    setCurrentTrack(track);
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
        <button onClick={logout}>
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
      <Player track={currentTrack} />
    </div>
  );
  
<SpotifyPlayer token={token} />
};

export default Dashboard;
