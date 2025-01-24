import { createSlice } from "@reduxjs/toolkit";

export const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState: {
    selectedItem: "",
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

// Exporting actions for dispatch
export const { setSelectedItem } = selectedItemSlice.actions;

// Exporting reducer for store configuration
export default selectedItemSlice.reducer;