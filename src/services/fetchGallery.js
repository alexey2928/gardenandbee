import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const GALLERY_STORAGE = "galleryStore";

export const fetchGallery = createAsyncThunk(
  "gallery/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedGallery = sessionStorage.getItem(GALLERY_STORAGE);
      if (storedGallery) {
        return JSON.parse(storedGallery);
      } else {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const data = querySnapshot.docs.map((doc) => doc.data().gallery).flat();
        sessionStorage.setItem(GALLERY_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Gallery is not available at the moment.");
    }
  }
);
