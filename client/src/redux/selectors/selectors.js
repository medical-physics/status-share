import jwtDecode from 'jwt-decode';
import { createSelector } from 'reselect';

const selectTeams = state => state.teams.teams;

const selectUsers = state => state.users.users;

export const selectTeamDetailsMap = createSelector(
  selectTeams,
  (teams) => {
    let map = {};

    teams.forEach((team) => {
      map[team._id] = team;
    });

    return map;
  }
);

export const selectTeamMembersMap = createSelector(
  selectUsers,
  selectTeams,
  (users, teams) => {
    let map = {};

    teams.forEach((team) => {
      map[team._id] = [];
    });

    users.forEach((user) => {
      map[user.teamId].push(user);
    });

    teams.forEach((team) => {
      map[team._id].sort((a, b) => a.priority - b.priority);
    });

    return map;
  }
);

const selectAccessToken = state => state.account.accessToken;

export const selectIsAccessTokenValid = createSelector(
  selectAccessToken,
  (token) => {
    if (token) {
      const isValid = jwtDecode(token);
      return isValid;
    }
    return false;
  }
);
