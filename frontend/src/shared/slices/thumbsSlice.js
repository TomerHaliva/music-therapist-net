import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  record: [],
};

export const thumbSlice = createSlice({
  name: "thumbBtn",
  initialState,
  reducers: {
    initThumbBtn: (state, action) => {
      state.isActive = action.payload.isActive;
      state.record = action.payload.record;
    },
    increment: (state, action) => {
      state.record.likes += 1;
    },
  },
});

export const { initThumbBtn, increment } = thumbSlice.actions;

export default thumbSlice.reducer;
