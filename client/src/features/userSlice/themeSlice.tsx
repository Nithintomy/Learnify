// In your store, create a new slice for the theme
// features/themeSlice/themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light", // Default theme mode
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state:any) => state.theme.mode;

export default themeSlice.reducer;
