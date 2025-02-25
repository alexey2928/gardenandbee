import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_REVIEW_API_KEY;
const LOCATION_ID = process.env.REACT_APP_PLACE_ID;
const ACCOUNT_ID = process.env.REACT_APP_ACCOUNT_ID;

// const GOOGLE_REVIEWS_PATH = `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT_ID}/locations/${LOCATION_ID}/reviews
// `;
const GOOGLE_REVIEWS_PATH = `https://places.googleapis.com/v1/places/${LOCATION_ID}?fields=id,rating,reviews,photos,displayName&key=${API_KEY}`;

const GOOGLE_REVIEWS_STORAGE = "googleReviewsStore";

export const fetchGoogleReviews = createAsyncThunk(
  "googleReviews/fetchGoogleReviews",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedGoogleReviews = sessionStorage.getItem(
        GOOGLE_REVIEWS_STORAGE
      );
      if (storedGoogleReviews) {
        return JSON.parse(storedGoogleReviews);
      } else {
        const { data } = await axios.get(GOOGLE_REVIEWS_PATH);
        sessionStorage.setItem(GOOGLE_REVIEWS_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Google Reviews are not available at the moment.");
    }
  }
);
