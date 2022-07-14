import React from 'react';
import { Helmet } from 'react-helmet';
import { authenticate } from '../util/Authenticator';

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
import { getUsersAsync } from '../redux/slices/usersSlice';
import { getTeamsAsync } from '../redux/slices/teamsSlice';

const styles = {
  table: {
    width: 482,
    margin: 15
  },
  spinnerdiv: {
    margin: 'auto 10px auto 15px'
  },
  spinnertext: {
    margin: 'auto auto 10px auto'
  },
  dialog: {
    width: 210
  },
  dummy: {
    width: 482,
    height: 20,
    margin: 15
  }
};

export default function Home () {
  const [stateTeams, setStateTeams] = React.useState({});

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const teams = useSelector((state) => state.teams.teams);
  const appName = useSelector((state) => state.account.appName);
  const loadingUsersData = useSelector((state) => state.users.loadingUsersData);
  const loadingTeamsData = useSelector((state) => state.teams.loadingTeamsData);
  const loadingUser = useSelector((state) => state.UI.loadingUser);
  const loadingTeam = useSelector((state) => state.UI.loadingTeam);

  React.useEffect(() => {
    // authenticate();
    dispatch(getTeamsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

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
  });

  return (
    <div>
      <Helmet>
        <title>{appName} | Home</title>
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
      <Grid container justify='center'>
        <UpdateBar />
        <NavBar />
        {loadingUsersData || loadingTeamsData
          ? <>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
            <Grid item sx={styles.table}>
              <LoadingTable />
            </Grid>
          </>
          : <>
            {teams.map((team) => {
              return (
                <Box key={team._id} order={teamDetailsMap[team._id].priority} sx={styles.table}>
                  <TeamTable teamMembers={teamMembersMap[team._id]} teamDetails={teamDetailsMap[team._id]} />
                </Box>
              );
            })}
            <Box order={99} sx={styles.dummy} />
          </>}
      </Grid>
    </div>
  );
}
