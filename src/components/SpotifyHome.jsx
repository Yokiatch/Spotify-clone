import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";

const SpotifyHome = () => {
  const playlists = [
    { 
      name: "Liked Songs", 
      image: "https://i.scdn.co/image/ab67706f00000003e8e28219724c2423afa4d320" 
    },
    { 
      name: "Today's Top Hits", 
      image: "https://i.scdn.co/image/ab67706f000000034f56aa1e38dbbde864252370" 
    },
    { 
      name: "Chill Vibes", 
      image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" 
    },
    { 
      name: "Workout Mix", 
      image: "https://i.scdn.co/image/ab67706f000000035e4b69a246de7f2e4b2468c8" 
    },
    { 
      name: "Lo-Fi Beats", 
      image: "https://i.scdn.co/image/ab67706f00000003ccbce1c720b43cfba853da30" 
    },
    { 
      name: "Rock Classics", 
      image: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e" 
    }
  ];

  const recentlyPlayed = [
    { 
      name: "Daily Mix 1", 
      description: "Coldplay, Imagine Dragons and more",
      image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcfc63410e20f29a28a05c37c/1/en/default" 
    },
    { 
      name: "Daily Mix 2", 
      description: "Drake, Kendrick Lamar and more",
      image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebf2bf1a4ac0c2db4099bf3b7a/2/en/default" 
    },
    { 
      name: "Daily Mix 3", 
      description: "Dua Lipa, The Weeknd and more",
      image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebcdce7620dc940db079bf4952/3/en/default" 
    },
    { 
      name: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      image: "https://i.scdn.co/image/ab67706f00000003c414e7daf34690c9f983f76e" 
    },
    { 
      name: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      image: "https://i.scdn.co/image/ab67706f00000003d057dfa654978af5c6c66e37" 
    }
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-2xl font-bold mb-6">Good Evening</h1>
        <h2 className="text-xl font-bold mb-4">Your Top Mixes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-40 p-3 rounded-md hover:bg-gray-700 transition cursor-pointer">
              <img src={playlist.image} alt={playlist.name} className="w-full h-32 object-cover rounded-md" />
              <h3 className="font-semibold text-sm mt-2">{playlist.name}</h3>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mt-8 mb-4">Made For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {recentlyPlayed.map((item, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-40 p-3 rounded-md hover:bg-gray-700 transition cursor-pointer">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md" />
              <h3 className="font-semibold text-sm mt-2">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default SpotifyHome;
