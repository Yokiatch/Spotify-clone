import { useEffect, useState } from "react";

const SpotifyPlayer = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    if (!token) {
      console.error("Spotify Token is missing!");
      return;
    }

    if (!document.getElementById("spotify-sdk")) {
      const script = document.createElement("script");
      script.id = "spotify-sdk";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify SDK is Ready!");

      const playerInstance = new window.Spotify.Player({
        name: "Musify Web Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      setPlayer(playerInstance);

      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Player Ready with Device ID:", device_id);
        setDeviceId(device_id);
        transferPlaybackToWebPlayer(device_id);
      });

      playerInstance.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
      });

      playerInstance.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  const transferPlaybackToWebPlayer = async (device_id) => {
    try {
      await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_ids: [device_id], play: false }),
      });
      console.log("Playback transferred to Web Player!");
    } catch (error) {
      console.error("Error transferring playback:", error);
    }
  };

  const playPause = async () => {
    if (!player) return;
    try {
      await player.activateElement();
      isPaused ? player.resume() : player.pause();
      setIsPaused(!isPaused);
    } catch (error) {
      console.error("Error playing/pausing track:", error);
    }
  };

  return (
    <div className="spotify-player">
      {currentTrack ? (
        <div className="track-info">
          <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
          <div>
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        </div>
      ) : (
        <p>No track playing</p>
      )}
      <button onClick={playPause}>{isPaused ? "▶️ Play" : "⏸️ Pause"}</button>
    </div>
  );
};

export default SpotifyPlayer;
