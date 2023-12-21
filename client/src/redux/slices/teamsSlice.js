import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadingTeam, stopLoadingTeam } from "./uiSlice";
import {
  getTeams,
  addTeam,
  deleteTeam,
  updateTeam
} from "../api/teamsAPI";

const initialState = {
  loadingTeamsData: false,
  teams: []
};

export const getTeamsAsync = createAsyncThunk(
  "teams/getTeams",
  async () => {
    const response = await getTeams();
    return response;
  }
);

export const addTeamAsync = createAsyncThunk(
  "teams/addTeam",
  async (newTeam, { dispatch }) => {
    try {
      dispatch(loadingTeam());
      const response = await addTeam(newTeam);
      dispatch(stopLoadingTeam());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateTeamAsync = createAsyncThunk(
  "teams/updateTeam",
  async (teamObj, { dispatch }) => {
    try {
      dispatch(loadingTeam());
      const response = await updateTeam(teamObj.teamId, teamObj.teamData);
      dispatch(stopLoadingTeam());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteTeamAsync = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId) => {
    try {
      const response = await deleteTeam(teamId);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    loadingTeamsData: (state) => {
      state.loadingTeamsData = true;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
      state.loadingTeamsData = false;
    },
    insertTeamFromStream: (state, action) => {
      state.teams = [
        ...state.teams,
        action.payload
      ];
    },
    deleteTeamFromStream: (state, action) => {
      const index1 = state.teams.findIndex(
        (user) => user._id === action.payload
      );
      if (index1 >= 0) {
        state.teams = [
          ...state.teams.slice(0, index1),
          ...state.teams.slice(index1 + 1)
        ];
      }
    },
    updateTeamFromStream: (state, action) => {
      const index2 = state.teams.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index2 >= 0) {
        for (const [key, value] of Object.entries(action.payload.updatedFields)) {
          state.teams[index2][key] = value;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsAsync.pending, (state) => {
        state.loadingTeamsData = true;
      })
      .addCase(getTeamsAsync.fulfilled, (state, action) => {
        state.loadingTeamsData = false;
        state.teams = action.payload;
      })
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        const index4 = state.teams.findIndex(
          (team) => team._id === action.payload._id
        );
        state.teams[index4].team = action.payload.team;
        state.teams[index4].priority = action.payload.priority;
        state.teams[index4].color = action.payload.color;
        state.teams[index4].col1 = action.payload.col1;
        state.teams[index4].col2 = action.payload.col2;
        state.teams[index4].col3 = action.payload.col3;
      });
  }
});

export const {
  loadingTeamsData,
  setTeams,
  insertTeamFromStream,
  deleteTeamFromStream,
  updateTeamFromStream
} = teamsSlice.actions;

export default teamsSlice.reducer;
