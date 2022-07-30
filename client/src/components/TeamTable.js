import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/TeamTable.json';

// Components
import ProfileDialog from './ProfileDialog';
import PresenceButton from './PresenceButton';
import EditStatus from './EditStatus';
import AddUserDialog from './AddUserDialog';
import EditTeam from './EditTeam';

// MUI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Toolbar
} from '@mui/material';

function createData (name, present, status, userId, memo, user) {
  return { name, present, status, userId, memo, user };
}

export default function TeamTable (props) {
  const rows = [];
  const { teamDetails } = props;

  props.teamMembers.forEach((user) => { rows.push(createData(user.name, user.present, user.status, user._id, user.memo, user)); });

  return (
    <>
      <Paper elevation={3}>
        <Toolbar>
          <Grid container sx={styles.header}>
            <Grid item>
              <Typography component='div'>
                <Box fontWeight='fontWeightBold' m={1} color={teamDetails.color}>
                  {teamDetails.team}
                </Box>
              </Typography>
            </Grid>
            <Grid item>
              {JSON.parse(localStorage.getItem('admin')) && (<>
                <EditTeam teamDetails={teamDetails} />
                <AddUserDialog teamName={teamDetails.team} teamId={teamDetails._id} />
              </>)}
            </Grid>
          </Grid>
        </Toolbar>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell><Box>{teamDetails.col1}</Box></TableCell>
                <TableCell><Box>{teamDetails.col2}</Box></TableCell>
                <TableCell><Box>{teamDetails.col3}</Box></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell sx={styles.tableCell}>
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item>
                        <ProfileDialog userId={row.userId} unreadMessages={row.user.unreadMessages} />
                      </Grid>
                      <Grid item sx={styles.box}>
                        {row.name}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align='center'>
                    <PresenceButton user={row.user} />
                  </TableCell>
                  <TableCell sx={styles.statusCell}>
                    <Grid container alignItems='center' justify='space-between' spacing={1}>
                      <Grid item>
                        {!JSON.parse(localStorage.getItem('viewOnly')) && (<EditStatus userId={row.userId} status={row.status} />)}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

TeamTable.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  teamDetails: PropTypes.object.isRequired
};
