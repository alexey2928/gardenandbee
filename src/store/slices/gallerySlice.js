import { createSlice } from "@reduxjs/toolkit";
import { fetchGallery } from "../../services/fetchGallery";

const initialState = {
  gallery: [],
  loadingGallery: false,
  errorGallery: "",
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state) => {
      state.loadingGallery = true;
    });
    builder.addCase(fetchGallery.fulfilled, (state, action) => {
      state.loadingGallery = false;
      state.gallery = action.payload;
      state.errorGallery = "";
    });
    builder.addCase(fetchGallery.rejected, (state, action) => {
      state.loadingGallery = false;
      state.gallery = [];
      state.errorGallery = action.payload;
    });
  },
});

export const selectGallery = (state) => state.gallery.gallery;
export const selectGalleryLoading = (state) => state.gallery.loadingGallery;
export const selectGalleryError = (state) => state.gallery.errorGallery;

export default gallerySlice.reducer;
