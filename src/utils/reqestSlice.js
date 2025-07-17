import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const modifiedRequest = state.filter((req) => req._id !== action.payload);
      return modifiedRequest;
    },
    clearRequest: () => null,
  },
});

export const { addRequests, removeRequest, clearRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
