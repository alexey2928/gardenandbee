import { createSlice } from "@reduxjs/toolkit";
import { fetchConsents } from "../../services/fetchConsents";

const initialState = {
  consents: [],
  loadingConsents: false,
  errorConsents: "",
};

const consentsSlice = createSlice({
  name: "consents",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchConsents.pending, (state) => {
      state.loadingConsents = true;
    });
    builder.addCase(fetchConsents.fulfilled, (state, action) => {
      state.loadingConsents = false;
      state.consents = action.payload;
      state.errorConsents = "";
    });
    builder.addCase(fetchConsents.rejected, (state, action) => {
      state.loadingConsents = false;
      state.consents = [];
      state.errorConsents = action.payload;
    });
  },
});

export const selectConsents = (state) => state.consents.consents;
export const selectConsentsLoading = (state) => state.consents.loadingConsents;
export const selectConsentsError = (state) => state.consents.errorConsents;

export default consentsSlice.reducer;
