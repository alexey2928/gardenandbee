import { configureStore } from "@reduxjs/toolkit";
import faqsSlice from "../store/slices/faqsSlice";
import reviewsSlice from "../store/slices/reviewsSlice";
import servicesSlice from "../store/slices/servicesSlice";
import gallerySlice from "../store/slices/gallerySlice";
import teamSlice from "../store/slices/teamSlice";
import formsSlice from "../store/slices/formsSlice";
import consentsSlice from "../store/slices/consentsSlice";

export const store = configureStore({
  reducer: {
    faqs: faqsSlice,
    reviews: reviewsSlice,
    services: servicesSlice,
    gallery: gallerySlice,
    team: teamSlice,
    forms: formsSlice,
    consents: consentsSlice,
  },
});
