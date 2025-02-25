import { configureStore } from "@reduxjs/toolkit";
import googleReviewsSlice from "./googleReviewsSlice";

export const store = configureStore({
  reducer: {
    googleReviews: googleReviewsSlice,
  },
});
