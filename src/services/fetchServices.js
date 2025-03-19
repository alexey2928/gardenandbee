import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const SERVICES_STORAGE = "servicesStore";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedServices = sessionStorage.getItem(SERVICES_STORAGE);
      if (storedServices) {
        return JSON.parse(storedServices);
      } else {
        const querySnapshot = await getDocs(collection(db, "services"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        sessionStorage.setItem(SERVICES_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Services are not available at the moment.");
    }
  }
);
