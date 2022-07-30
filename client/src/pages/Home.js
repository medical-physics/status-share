import React from 'react';
import { Helmet } from 'react-helmet';
import { authenticate } from '../util/Authenticator';
import styles from '../styles/pages/Home.json';

// Components
import NavBar from '../components/NavBar';
import UpdateBar from '../components/UpdateBar';
import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';

// MUI Components
import {
  Grid,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  CircularProgress
} from '@mui/material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { getAppNameAsync } from '../redux/slices/accountSlice';
import { getUsersAsync } from '../redux/slices/usersSlice';
import { getTeamsAsync } from '../redux/slices/teamsSlice';

const LOADING_TABLES_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Home () {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const teams = useSelector((state) => state.teams.teams);
  const appName = useSelector((state) => state.account.appName);
  const loadingUsersData = useSelector((state) => state.users.loadingUsersData);
  const loadingTeamsData = useSelector((state) => state.teams.loadingTeamsData);
  const checkingAuth = useSelector((state) => state.account.checkingAuth);
  const loadingUser = useSelector((state) => state.UI.loadingUser);
  const loadingTeam = useSelector((state) => state.UI.loadingTeam);
  const [showDummyDiv, setShowDummyDiv] = React.useState(false);

  React.useEffect(() => {
    authenticate()
      .then((res) => {
        console.log(res);
        dispatch(getAppNameAsync());
        dispatch(getTeamsAsync());
        dispatch(getUsersAsync());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  React.useEffect(() => {
    if (teams.length % 2 !== 0) {
      setShowDummyDiv(true);
    }
  }, [teams]);

  // key: team ID, value: array of users in team
  const teamMembersMap = {};
  // key: team ID, value: team details in object form
  const teamDetailsMap = {};

  teams.forEach((team) => {
    teamMembersMap[team._id] = [];
    teamDetailsMap[team._id] = team;
  });

  teams.forEach((team) => {
    users.forEach((user) => {
      if (user.teamId === team._id) {
        teamMembersMap[team._id].push(user);
      }
    });
    teamMembersMap[team._id].sort((a, b) => a.priority - b.priority);
  });

  return (
    <>
      <Helmet>
        <title>{`${appName || 'Medical Physics'} | Home`}</title>
      </Helmet>
      <Dialog open={loadingTeam}>
        <DialogTitle>
          <Grid sx={styles.dialog}>
            <Typography variant='overline' sx={styles.spinnertext}>Updating teams...</Typography>
            <CircularProgress size={20} sx={styles.spinnerdiv} />
          </Grid>
        </DialogTitle>
      </Dialog>
      <Dialog open={loadingUser}>
        <DialogTitle>
          <Grid sx={styles.dialog}>
            <Typography variant='overline' sx={styles.spinnertext}>Adding user...</Typography>
            <CircularProgress size={20} sx={styles.spinnerdiv} />
          </Grid>
        </DialogTitle>
      </Dialog>
      <UpdateBar />
      <NavBar />
      <Grid container sx={styles.homeContainer}>
        {loadingUsersData || loadingTeamsData || checkingAuth
          ? <>
            {LOADING_TABLES_ARRAY.map((number) => {
              return (
                <Grid key={number} item sx={styles.table}>
                  <LoadingTable />
                </Grid>
              );
            })}
            <Box order={99} sx={styles.dummy} />
          </>
          : <>
            {teams.map((team) => {
              return (
                <Box key={team._id} order={teamDetailsMap[team._id].priority} sx={styles.table}>
                  <TeamTable teamMembers={teamMembersMap[team._id]} teamDetails={teamDetailsMap[team._id]} />
                </Box>
              );
            })}
            {showDummyDiv && <Box order={99} sx={styles.dummy} />}
          </>}
      </Grid>
    </>
  );
}
