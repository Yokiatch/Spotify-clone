import { configureStore, createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    isPlaying: false,
    volume: 50, // Default volume level
    repeatMode: "off", // off, one, all
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true; // Auto-play when a new song is set
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setRepeatMode: (state, action) => {
      state.repeatMode = action.payload;
    },
  },
});

export const { setCurrentSong, togglePlay, setPlayingState, setVolume, setRepeatMode } = playerSlice.actions;

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
  },
});

export default store;
