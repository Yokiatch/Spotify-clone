import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
const CLIENT_ID = "49f9089db6ba461f9a11ca0cedeb61d7";
const REDIRECT_URI = "http://localhost:5173/callback";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=49f9089db6ba461f9a11ca0cedeb61d7
&response_type=token
&redirect_uri=${encodeURIComponent("http://localhost:5173/callback")}
&scope=${encodeURIComponent("user-read-private user-read-email user-library-read")}`;

// Extract token from URL
const getTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get("access_token");
};

// Retrieve token and set it
const accessToken = localStorage.getItem("spotify_token") || getTokenFromUrl();
if (accessToken) {
  spotify.setAccessToken(accessToken);
  localStorage.setItem("spotify_token", accessToken); // Store for later use
}

export { spotify, AUTH_URL };
