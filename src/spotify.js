import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
const CLIENT_ID = "64b087a47e504918af6d99949b7e60dc";
const REDIRECT_URI = "http://localhost:5173/callback";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-read-private user-read-email user-library-read`;

// Extract token from URL
const getTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get("access_token");
};

// Retrieve token and set it
const accessToken = getTokenFromUrl();
if (accessToken) {
  spotify.setAccessToken(accessToken);
  localStorage.setItem("spotify_token", accessToken); // Store for later use
}

export { spotify, AUTH_URL };
