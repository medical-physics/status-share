import React from "react";
import { authenticate } from "../auth/Authenticator";
import styles from "../styles/pages/Home.json";
import "../styles/pages/home.css";

// Components
import NavBar from "../components/NavBar";
import TeamTable from "../components/TeamTable";
import LoadingTable from "../components/LoadingTable";
import SocketWrapper from "../streams/SocketWrapper";

// MUI Components
import {
  Grid,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  CircularProgress,
} from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAppNameAsync } from "../redux/slices/accountSlice";
import { getUsersAsync } from "../redux/slices/usersSlice";
import { getTeamsAsync } from "../redux/slices/teamsSlice";
import {
  selectIsAccessTokenValid,
  selectTeamDetailsMap,
  selectTeamMembersMap,
} from "../util/Selectors";
import { initializeDarkMode } from "../util/DarkMode";

const LOADING_TABLES_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Home() {
  const dispatch = useDispatch();

  const teams = useSelector((state) => state.teams.teams);
  const appName = useSelector((state) => state.account.appName);
  const loadingUsersData = useSelector((state) => state.users.loadingUsersData);
  const loadingTeamsData = useSelector((state) => state.teams.loadingTeamsData);
  const checkingAuth = useSelector((state) => state.account.checkingAuth);
  const loadingUser = useSelector((state) => state.UI.loadingUser);
  const loadingTeam = useSelector((state) => state.UI.loadingTeam);
  const teamDetailsMap = useSelector((state) => selectTeamDetailsMap(state));
  const teamMembersMap = useSelector((state) => selectTeamMembersMap(state));
  const isTokenValid = useSelector((state) => selectIsAccessTokenValid(state));
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const [showLoadingTables, setShowLoadingTables] = React.useState(true);

  React.useEffect(() => {
    authenticate();
    initializeDarkMode();
  }, []);

  React.useEffect(() => {
    try {
      if (isTokenValid) {
        dispatch(getAppNameAsync());
        dispatch(getTeamsAsync());
        dispatch(getUsersAsync());
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, isTokenValid]);

  React.useEffect(() => {
    if (!loadingUsersData && !loadingTeamsData && !checkingAuth) {
      setShowLoadingTables(false);
    } else {
      setShowLoadingTables(true);
    }
  }, [loadingUsersData, loadingTeamsData, checkingAuth]);

  return (
    <SocketWrapper>
      <div className={"page-container" + (darkMode ? " dark-mode" : "")}>
        <Dialog open={loadingTeam}>
          <DialogTitle>
            <Grid sx={styles.dialog}>
              <Typography variant="overline" sx={styles.spinnertext}>
                Updating teams...
              </Typography>
              <CircularProgress size={20} sx={styles.spinnerdiv} />
            </Grid>
          </DialogTitle>
        </Dialog>
        <Dialog open={loadingUser}>
          <DialogTitle>
            <Grid sx={styles.dialog}>
              <Typography variant="overline" sx={styles.spinnertext}>
                Updating users...
              </Typography>
              <CircularProgress size={20} sx={styles.spinnerdiv} />
            </Grid>
          </DialogTitle>
        </Dialog>
        <NavBar />
        <Grid container sx={styles.homeContainer}>
          {showLoadingTables ? (
            <>
              {LOADING_TABLES_ARRAY.map((number) => {
                return (
                  <Grid
                    key={number}
                    item
                    sx={{ ...styles.table, minWidth: isMobile ? "90%" : "" }}
                  >
                    <LoadingTable />
                  </Grid>
                );
              })}
              <Box order={99} sx={styles.dummy} />
            </>
          ) : (
            <>
              {teams.map((team) => {
                return (
                  <Box
                    key={team._id}
                    order={teamDetailsMap[team._id].priority}
                    sx={{ ...styles.table, minWidth: isMobile ? "90%" : "" }}
                  >
                    <TeamTable
                      teamMembers={teamMembersMap[team._id] || []}
                      teamDetails={teamDetailsMap[team._id] || {}}
                    />
                  </Box>
                );
              })}
              <Box order={99} sx={styles.dummy} />
              <Box order={99} sx={styles.dummy} />
            </>
          )}
        </Grid>
      </div>
    </SocketWrapper>
  );
}
