import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadingTeam, stopLoadingTeam } from './uiSlice';
import {
  getTeams,
  addTeam,
  deleteTeam
} from '../api/teamsAPI';

const initialState = {
  loadingTeamsData: false,
  teams: []
};

export const getTeamsAsync = createAsyncThunk(
  'teams/getTeams',
  async () => {
    const response = await getTeams();
    return response;
  }
);

export const addTeamAsync = createAsyncThunk(
  'teams/addTeam',
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
  'teams/updateTeam',
  async (teamObj, { dispatch }) => {
    try {
      dispatch(loadingTeam());
      const response = await addTeam(teamObj.teamId, teamObj.teamData);
      dispatch(stopLoadingTeam());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteTeamAsync = createAsyncThunk(
  'teams/deleteTeam',
  async (teamId, { dispatch }) => {
    try {
      const response = await deleteTeam(teamId);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    loadingTeamsData: (state) => {
      state.loadingTeamsData = true;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
      state.loadingTeamsData = false;
    },
    updateTeam: (state, action) => {
      const index1 = state.teams.findIndex(
        (team) => team.teamId === action.payload.teamId
      );
      state.teams[index1].team = action.payload.team;
      state.teams[index1].priority = action.payload.priority;
      state.teams[index1].color = action.payload.color;
      state.teams[index1].col1 = action.payload.col1;
      state.teams[index1].col2 = action.payload.col2;
      state.teams[index1].col3 = action.payload.col3;
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
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams = [
          action.payload,
          ...state.teams
        ];
      });
  }
});

export const {
  loadingTeamsData,
  setTeams,
  updateTeam
} = teamsSlice.actions;

export default teamsSlice.reducer;
