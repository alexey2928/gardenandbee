import { createSlice } from "@reduxjs/toolkit";
import { fetchGoogleReviews } from "../services/fetchGoogleReviews";

const initialState = {
  googleReviews: [],
  loadingGoogleReviews: false,
  errorGoogleReviews: "",
};

const googleReviewsSlice = createSlice({
  name: "googleReviews",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGoogleReviews.pending, (state) => {
      state.loadingGoogleReviews = true;
    });
    builder.addCase(fetchGoogleReviews.fulfilled, (state, action) => {
      state.loadingGoogleReviews = false;
      state.googleReviews = action.payload;
      state.errorGoogleReviews = "";
    });
    builder.addCase(fetchGoogleReviews.rejected, (state, action) => {
      state.loadingGoogleReviews = false;
      state.googleReviews = [];
      state.errorGoogleReviews = action.payload;
    });
  },
});

export const selectGoogleReviews = (state) => state.googleReviews.googleReviews;
export const selectGoogleReviewsLoading = (state) =>
  state.googleReviews.loadingGoogleReviews;
export const selectGoogleReviewsError = (state) =>
  state.googleReviews.errorGoogleReviews;

export default googleReviewsSlice.reducer;
