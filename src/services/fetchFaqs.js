import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const FAQS_STORAGE = "faqsStore";

export const fetchFaqs = createAsyncThunk(
  "faqs/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedFaqs = sessionStorage.getItem(FAQS_STORAGE);
      if (storedFaqs) {
        return JSON.parse(storedFaqs);
      } else {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const data = querySnapshot.docs.map((doc) => doc.data().faqs).flat();
        sessionStorage.setItem(FAQS_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue(
        "Frequently asked questions are not available at the moment."
      );
    }
  }
);
