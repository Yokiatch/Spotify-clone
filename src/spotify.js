import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
const CLIENT_ID = "49f9089db6ba461f9a11ca0cedeb61d7";
const REDIRECT_URI = "http://localhost:5173/callback";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "streaming",
  "user-modify-playback-state",
  "user-read-playback-state"
];

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}
&response_type=token
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}
&scope=${encodeURIComponent(SCOPES.join(" "))}`;

const storedToken = localStorage.getItem("spotifyToken");
if (storedToken) {
  spotify.setAccessToken(storedToken);
}

export { spotify, AUTH_URL };
