import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { spotify } from "../spotify";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const tokenFromUrl = new URLSearchParams(hash.substring(1)).get("access_token");

      if (tokenFromUrl) {
        localStorage.setItem("spotifyToken", tokenFromUrl);
        spotify.setAccessToken(tokenFromUrl);
        window.history.replaceState({}, document.title, "/"); // Remove token from URL
        navigate("/"); // Redirect to Dashboard or Home
      }
    }
  }, [navigate]);

  return <h2>Authenticating...</h2>; // Temporary message before redirect
};

export default Callback;
