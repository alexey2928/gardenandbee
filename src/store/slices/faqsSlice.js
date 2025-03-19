import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqs } from "../../services/fetchFaqs";

const initialState = {
  faqs: [],
  loadingFaqs: false,
  errorFaqs: "",
};

const faqsSlice = createSlice({
  name: "faqs",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFaqs.pending, (state) => {
      state.loadingFaqs = true;
    });
    builder.addCase(fetchFaqs.fulfilled, (state, action) => {
      state.loadingFaqs = false;
      state.faqs = action.payload;
      state.errorFaqs = "";
    });
    builder.addCase(fetchFaqs.rejected, (state, action) => {
      state.loadingFaqs = false;
      state.faqs = [];
      state.errorFaqs = action.payload;
    });
  },
});

export const selectFaqs = (state) => state.faqs.faqs;
export const selectFaqsLoading = (state) => state.faqs.loadingFaqs;
export const selectFaqsError = (state) => state.faqs.errorFaqs;

export default faqsSlice.reducer;
