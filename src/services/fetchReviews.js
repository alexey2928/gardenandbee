import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const REVIEWS_STORAGE = "reviewsStore";

export const fetchReviews = createAsyncThunk(
  "reviews/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedReviews = sessionStorage.getItem(REVIEWS_STORAGE);
      if (storedReviews) {
        return JSON.parse(storedReviews);
      } else {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const data = querySnapshot.docs.map((doc) => doc.data().reviews).flat();
        sessionStorage.setItem(REVIEWS_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Reviews are not available at the moment.");
    }
  }
);
