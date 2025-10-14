import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eyelashExtensionForm: {
    page1: {},
    page2: {},
    page3: {},
  },
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    savePageData: (state, action) => {
      const { formName, page, data } = action.payload;
      if (!state[formName]) state[formName] = {};
      state[formName][page] = data;
    },
    clearForm: (state, action) => {
      const { formName } = action.payload;
      if (state[formName]) {
        Object.keys(state[formName]).forEach((page) => {
          state[formName][page] = {};
        });
      }
    },
  },
});

export const selectEyelashExtensionForm = (state) =>
  state.forms.eyelashExtensionForm;
export const { savePageData, clearForm } = formsSlice.actions;
export default formsSlice.reducer;
