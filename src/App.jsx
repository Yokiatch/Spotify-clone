import { useEffect, useState } from "react";
import { spotify } from "./spotify";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenFromUrl = new URLSearchParams(hash.substring(1)).get("access_token");
      if (tokenFromUrl) {
        localStorage.setItem("spotifyToken", tokenFromUrl);
        spotify.setAccessToken(tokenFromUrl);
        window.history.pushState({}, "", "/"); // Remove token from URL
        navigate("/"); // Redirect to home (Dashboard)
      }
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>; // Temporary message before redirect
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("spotifyToken") || null);

  useEffect(() => {
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Spotify Clone",
          getOAuthToken: (cb) => { cb(token); },
          volume: 0.5,
        });

        // Error Handling
        player.addListener("initialization_error", ({ message }) => console.error("Initialization error:", message));
        player.addListener("authentication_error", ({ message }) => console.error("Authentication error:", message));
        player.addListener("account_error", ({ message }) => console.error("Account error:", message));
        player.addListener("playback_error", ({ message }) => console.error("Playback error:", message));

        // Player is Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID:", device_id);
        });

        // Player is Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline:", device_id);
        });

        player.connect();
      };
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
