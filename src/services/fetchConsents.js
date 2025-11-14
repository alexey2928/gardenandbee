import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const CONSENTS_STORAGE = "consentsStore";

export const fetchConsents = createAsyncThunk(
  "consents/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedConsents = sessionStorage.getItem(CONSENTS_STORAGE);
      if (storedConsents) {
        return JSON.parse(storedConsents);
      } else {
        const querySnapshot = await getDocs(collection(db, "consents"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        sessionStorage.setItem(CONSENTS_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Consents are not available at the moment.");
    }
  }
);
