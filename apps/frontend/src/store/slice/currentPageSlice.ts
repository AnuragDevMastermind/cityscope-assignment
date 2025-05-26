import { createSlice } from "@reduxjs/toolkit";
import { CREATE_POST_ENDPOINT, FEED_ENDPOINT, FILTER_ENDPOINT, PROFILE_ENDPOINT, YOUR_POST_ENDPOINT } from "@repo/utils/endpoints";


export const currentPageSlide = createSlice({
  name: "currentPage",
  initialState: FEED_ENDPOINT,
  reducers: {
    setFeedPage: () => FEED_ENDPOINT,
    setProfilePage: () => PROFILE_ENDPOINT,
    setYourPostPage: () => YOUR_POST_ENDPOINT,
    setCreatePostPage: () => CREATE_POST_ENDPOINT,
    setFilterPage: () => FILTER_ENDPOINT
  },
});

export const {
  setFeedPage,
  setProfilePage,
  setYourPostPage,
  setCreatePostPage,
  setFilterPage
} = currentPageSlide.actions;

export default currentPageSlide.reducer;
