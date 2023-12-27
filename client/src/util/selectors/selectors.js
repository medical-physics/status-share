import jwtDecode from "jwt-decode";
import { BUFFER_TIME } from "../../auth/Authenticator";
import { createSelector } from "reselect";

const selectTeams = (state) => state.teams.teams;

const selectUsers = (state) => state.users.users;

export const selectTeamDetailsMap = createSelector(selectTeams, (teams) => {
  const map = {};

  teams.forEach((team) => {
    map[team._id] = team;
  });

  return map;
});

export const selectTeamMembersMap = createSelector(
  selectUsers,
  selectTeams,
  (users, teams) => {
    const map = {};

    if (users.length && teams.length) {
      teams.forEach((team) => {
        map[team._id] = [];
      });

      users.forEach((user) => {
        if (map[user.teamId]) {
          map[user.teamId].push(user);
        }
      });

      teams.forEach((team) => {
        if (map[team._id]) {
          map[team._id].sort((a, b) => a.priority - b.priority);
        }
      });
    }

    return map;
  }
);

const selectAccessToken = (state) => state.account.accessToken;

export const selectIsAccessTokenValid = createSelector(
  selectAccessToken,
  (token) => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
        return timeUntilExpiry >= BUFFER_TIME;
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  }
);

export const selectUsersSortedByName = createSelector(selectUsers, (users) => {
  if (users.length) {
    return [...users].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  return users;
});
