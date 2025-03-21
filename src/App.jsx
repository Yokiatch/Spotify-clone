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
