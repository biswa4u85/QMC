import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";

const initialState = {
  videoData: [],
  videoDetails: {},
  editableVideoData: [],
};

export const counterSlice = createSlice({
  name: "createVideoData",
  initialState,

  reducers: {
    addVideoDetails: (state, action) => {
      console.log({ payload: action.payload });
      state.videoDetails = { ...action.payload };
    },
    addVideoData: (state, action) => {
      state.videoData.push({
        ...action.payload,
        endTime: parseFloat(action.payload.endTime),
        startTime: parseFloat(action.payload.startTime),
      });
    },
    deleteVideoCardData: (state, action) => {
      state.videoData = state.videoData.filter((sr) => sr.x !== action.payload);
    },
    mutateVideoData: (state, action) => {
      state.videoData = action.payload;
    },

    editVideoData: (state, action) => {
      state.videoData = state.videoData.filter(
        (sr) => sr.x !== action.payload.x
      );
      state.videoData.push({
        ...action.payload,
        endTime: parseFloat(action.payload.endTime),
        startTime: parseFloat(action.payload.startTime),
      });
    },

    editVideoId: (state, action) => {
      state.editableVideoData = action.payload;
    },

    clearAll: (state) => {
      (state.videoData = initialState.videoData),
        (state.videoDetails = initialState.videoDetails),
        (state.editableVideoData = initialState.editableVideoData);
    },
  },
});

export const {
  clearAll,
  editVideoId,
  addVideoData,
  editVideoData,
  addVideoDetails,
  mutateVideoData,
  deleteVideoCardData,
} = counterSlice.actions;
export default counterSlice.reducer;
