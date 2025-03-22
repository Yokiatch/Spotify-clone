import { useEffect, useState } from "react";

const SpotifyPlayer = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: "Musify Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      playerInstance.connect();
      setPlayer(playerInstance);
    };
  }, [token]);

  return (
    <div>
      <h3>Spotify Player</h3>
      <p>{deviceId ? "Player Ready" : "Loading Player..."}</p>
    </div>
  );
};

export default SpotifyPlayer;
