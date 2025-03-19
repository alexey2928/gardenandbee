import { createSlice } from "@reduxjs/toolkit";
import { fetchServices } from "../../services/fetchServices";

const initialState = {
  services: [],
  loadingServices: false,
  errorServices: "",
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchServices.pending, (state) => {
      state.loadingServices = true;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loadingServices = false;
      state.services = action.payload;
      state.errorServices = "";
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loadingServices = false;
      state.services = [];
      state.errorServices = action.payload;
    });
  },
});

export const selectServices = (state) => state.services.services;
export const selectServicesLoading = (state) => state.services.loadingServices;
export const selectServicesError = (state) => state.services.errorServices;

export default servicesSlice.reducer;
