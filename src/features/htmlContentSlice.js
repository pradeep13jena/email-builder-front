import { createSlice } from "@reduxjs/toolkit";

export const sethtmlContentSlice = createSlice({
  name: "htmlContent",
  initialState: {
    htmlContent: ""
  },
  reducers: {
    sethtmlContent: (state, action) => {
      state.htmlContent = action.payload;
    },
  },
});

export const { sethtmlContent } = sethtmlContentSlice.actions;

export default sethtmlContentSlice.reducer;