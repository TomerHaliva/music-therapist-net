import { configureStore } from "@reduxjs/toolkit";
import playlist from "../slices/playlistSlice";
import thumbBtn from "../slices/thumbsSlice";

export const store = configureStore({
  reducer: {
    playlist,
    thumbBtn,
  },
});
