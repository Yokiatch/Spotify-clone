import { useEffect, useState } from "react";
import { FaHome, FaSearch, FaSignOutAlt, FaPlay } from "react-icons/fa";
import { auth, logout } from "../firebase";
import { spotify } from "../spotify";
import SpotifyPlayer from "./SpotifyPlayer";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");

    if (!storedToken) {
      console.error("Spotify access token is missing!");
      return;
    }

    // Validate token by making a test request
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Invalid token. Redirecting to login.");
          localStorage.removeItem("spotify_access_token");
          setToken(null);
        } else {
          setToken(storedToken);
          spotify.setAccessToken(storedToken);
        }
      })
      .catch((err) => console.error("Error validating token:", err));
  }, []);

  useEffect(() => {
    if (!token) return;

    spotify.setAccessToken(token);

    spotify
      .getMe()
      .then((userData) => setUser(userData))
      .catch((err) => {
        console.error("Error fetching user data:", err);
        if (err.status === 401) {
          console.error("Token expired. Refreshing...");
          localStorage.removeItem("spotify_access_token");
          setToken(null);
        }
      });

    spotify
      .getUserPlaylists()
      .then((data) => setPlaylists(data.items || []))
      .catch((error) => console.error("Error fetching playlists:", error));
  }, [token]);

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    if (!token) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: "Spotify Clone Player",
        getOAuthToken: (cb) => cb(token),
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.connect();
    };
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

  const playSong = async (track) => {
    if (!deviceId) {
      console.error("No device ID found! Make sure Web Player is ready.");
      return;
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [track.uri] }),
      });

      console.log("Playing song:", track.name);
    } catch (error) {
      console.error("Error playing song:", error);
    }
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
              <img src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"} alt={track.name} />
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

      {/* Spotify Player */}
      <SpotifyPlayer token={token} />
    </div>
  );
};

export default Dashboard;
