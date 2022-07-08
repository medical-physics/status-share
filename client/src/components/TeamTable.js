import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

// Redux stuff
import { connect } from 'react-redux';

function createData (name, present, status, userId, memo, user) {
  return { name, present, status, userId, memo, user };
}

const styles = {
  container: {
    margin: 20
  },
  statusCell: {
    width: 180,
    flexWrap: 'wrap',
    fontSize: 12
  },
  // style for font size
  resize: {
    fontSize: 12
  },
  tableCell: {
    width: 140,
    fontSize: 13
  },
  tableCell2: {
    width: 15
  },
  checkbox: {
    width: 10,
    height: 10
  },
  box: {
    maxWidth: 110
  },
  status: {
    maxWidth: 150
  }
};

export class TeamTable extends Component {
  constructor () {
    super();
    this.state = {
      tableColor: {},
      users: []
    };
  }

  render () {
    const rows = [];
    const { teamsFields } = this.props;

    this.props.teamMembers.forEach((user) => { rows.push(createData(user.name, user.present, user.status, user.userId, user.memo, user)); });

    return (
      <div>
        <Paper elevation={3}>
          <Toolbar>
            <Grid justify='space-between' container>
              <Grid item>
                <Typography>
                  <Box fontWeight='fontWeightBold' m={1} color={teamsFields.color}>
                    {teamsFields.team}
                  </Box>
                </Typography>
              </Grid>
              <Grid item>
                {Boolean(parseInt(localStorage.admin)) && (<>
                  <EditTeam teamsFields={teamsFields} />
                  <AddUserDialog teamName={teamsFields.team} teamId={teamsFields.teamId} />
                </>)}
              </Grid>
            </Grid>
          </Toolbar>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell><Box>{teamsFields.col1}</Box></TableCell>
                  <TableCell><Box>{teamsFields.col2}</Box></TableCell>
                  <TableCell><Box>{teamsFields.col3}</Box></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell sx={styles.tableCell}>
                      <Grid container alignItems='center' spacing={1}>
                        <Grid item>
                          <ProfileDialog userId={row.userId} userMemo={row.memo} unreadMessages={row.user.unreadMessages} />
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
                        <Grid item sx={styles.status}>
                          {row.status}
                        </Grid>
                        <Grid item>
                          {!parseInt(localStorage.viewOnly) && (<EditStatus userId={row.userId} />)}
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users
});

TeamTable.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  teamsFields: PropTypes.object.isRequired

};

export default connect(mapStateToProps)(TeamTable);
