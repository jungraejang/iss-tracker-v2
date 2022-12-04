import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issService from "../services/iss.service";

const initialState = { latitude: 0, longitude: 0, timestamp: 0, message: "" };

export const getIssInfo = createAsyncThunk("iss/getIssInfo", async () => {
  try {
    let res = await issService.getISSInfo();
    return res.data;
  } catch (e) {
    return e;
  }
});

export const issSlice = createSlice({
  name: "iss",
  initialState,
  reducers: {
    setIssInfo: (state, action) => {
      state.latitude = action.payload;
    },
  },
  extraReducers: {
    [getIssInfo.fulfilled]: (state, action) => {
      // state.user = action.payload.message;
      state.latitude = parseFloat(action.payload.iss_position.latitude);
      state.longitude = parseFloat(action.payload.iss_position.longitude);
      state.timestamp = action.payload.timestamp;
    },
    [getIssInfo.rejected]: (state, action) => {
      state.message = "fetch failed";
    },
  },
});

export const { setIssInfo } = issSlice.actions;

export const selectLatitude = (state) => state.iss.latitude;
export const selectLongitude = (state) => state.iss.longitude;
export const selectTimestamp = (state) => state.iss.timestamp;

export default issSlice.reducer;
