import { createSlice } from "@reduxjs/toolkit";


export const currentPageSlide = createSlice({
  name: "currentPage",
  initialState: false,
  reducers: {
    setCurrentLocation: () => true,
    resetCurrentLocation: () => false,
  },
});

export const {
  setCurrentLocation,
  resetCurrentLocation,
} = currentPageSlide.actions;

export default currentPageSlide.reducer;
