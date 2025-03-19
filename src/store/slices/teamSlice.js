import { createSlice } from "@reduxjs/toolkit";
import { fetchTeam } from "../../services/fetchTeam";

const initialState = {
  teamMembers: [],
  loadingTeamMembers: false,
  errorTeamMembers: "",
};

const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeam.pending, (state) => {
      state.loadingTeamMembers = true;
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.loadingTeamMembers = false;
      state.teamMembers = action.payload;
      state.errorTeamMembers = "";
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      state.loadingTeamMembers = false;
      state.teamMembers = [];
      state.errorTeamMembers = action.payload;
    });
  },
});

export const selectTeamMembers = (state) => state.team.teamMembers;
export const selectTeamMembersLoading = (state) =>
  state.team.loadingTeamMembers;
export const selectTeamMembersError = (state) => state.team.errorTeamMembers;

export default teamSlice.reducer;
