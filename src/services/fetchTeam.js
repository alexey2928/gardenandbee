import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../common/firebase";
import { collection, getDocs } from "firebase/firestore";

const TEAM_STORAGE = "teamStore";

export const fetchTeam = createAsyncThunk(
  "teamMembers/fetch",
  async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const storedTeam = sessionStorage.getItem(TEAM_STORAGE);
      if (storedTeam) {
        return JSON.parse(storedTeam);
      } else {
        const querySnapshot = await getDocs(collection(db, "team"));
        const data = querySnapshot.docs
          .map((doc) => doc.data().teamMembers)
          .flat();
        sessionStorage.setItem(TEAM_STORAGE, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue("Team members are not available at the moment.");
    }
  }
);
