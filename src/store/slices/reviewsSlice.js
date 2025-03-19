import { createSlice } from "@reduxjs/toolkit";
import { fetchReviews } from "../../services/fetchReviews";

const initialState = {
  reviews: [],
  loadingReviews: false,
  errorReviews: "",
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.loadingReviews = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.loadingReviews = false;
      state.reviews = action.payload;
      state.errorReviews = "";
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loadingReviews = false;
      state.reviews = [];
      state.errorReviews = action.payload;
    });
  },
});

export const selectReviews = (state) => state.reviews.reviews;
export const selectReviewsLoading = (state) => state.reviews.loadingReviews;
export const selectReviewsError = (state) => state.reviews.errorReviews;

export default reviewsSlice.reducer;
