import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  records: [],
  currentPlay: {}
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    initPlaylist: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.records = action.payload.records;
      state.currentPlay = action.payload.currentPlay
    },
    setCurrentPlayer: (state, action) =>{
      if(action.payload.comment){
        state.currentPlay.comments = action.payload.comment.comment
      } else {
        state.currentPlay = {...action.payload.currentPlay}
      }
    }
  },
});

export const { initPlaylist, setCurrentPlayer } = playlistSlice.actions;
export default playlistSlice.reducer;
