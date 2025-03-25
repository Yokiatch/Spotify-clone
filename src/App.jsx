import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { spotify } from "./spotify";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Callback from "./components/Callback"; // Import Callback component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("spotifyToken") || null);

  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
        <Route path="/callback" element={<Callback />} /> {/* Fixing Token Handling */}
      </Routes>
    </Router>
  );
};

export default App;
