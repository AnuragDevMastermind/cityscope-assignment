import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationFilter {
  coordinates: [number, number];
  radius: number;
}

interface FiltersState {
  postType?: string;
  location?: LocationFilter;
}

const initialState: FiltersState = {
  postType: undefined,
  location: undefined,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPostTypeFilter: (state, action: PayloadAction<string | undefined>) => {
      state.postType = action.payload;
    },
    setLocationFilter: (state, action: PayloadAction<LocationFilter | undefined>) => {
      state.location = action.payload;
    },
    clearFilters: (state) => {
      state.postType = undefined;
      state.location = undefined;
    },
  },
});

export const { 
  setPostTypeFilter, 
  setLocationFilter,
  clearFilters 
} = filterSlice.actions;

export default filterSlice.reducer;