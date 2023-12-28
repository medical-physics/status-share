import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/team-table.json";

// Components
import ProfileDialog from "./ProfileDialog";
import PresenceButton from "./PresenceButton";
import EditStatusDialog from "./EditStatusDialog";
import AddUserDialog from "./AddUserDialog";
import EditTeamDialog from "./EditTeamDialog";
import CheckInSelector from "./CheckInSelector";

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
  Toolbar,
  IconButton,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

function createData(name, present, status, userId, memo, user) {
  return { name, present, status, userId, memo, user };
}

export default function TeamTable(props) {
  const rows = [];
  const { teamDetails, teamMembers } = props;
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  teamMembers.forEach((user) => {
    rows.push(
      createData(
        user.name,
        user.present,
        user.status,
        user._id,
        user.memo,
        user
      )
    );
  });

  return (
    <Paper
      sx={{
        borderRadius: 2,
        backgroundColor: darkMode ? "#161b22" : "",
        border: "1px solid",
        borderColor: darkMode ? "#1e4173" : "#7A7A7A",
      }}
      elevation={0}
    >
      <Toolbar>
        <Grid container sx={styles.header}>
          <Grid item sx={styles.teamTitle}>
            <Typography component="div">
              <Box fontWeight="fontWeightBold" m={1} color={teamDetails.color}>
                {teamDetails.team}
              </Box>
            </Typography>
            {teamDetails.hyperlink && (
              <a
                href={teamDetails.hyperlink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <IconButton>
                  <LinkIcon sx={{ color: teamDetails.color }} />
                </IconButton>
              </a>
            )}
          </Grid>
          <Grid item>
            {JSON.parse(localStorage.getItem("admin")) && (
              <>
                <EditTeamDialog
                  teamDetails={teamDetails}
                  teamSize={teamMembers.length || 0}
                />
                <AddUserDialog
                  teamName={teamDetails.team}
                  teamId={teamDetails._id}
                  teamSize={teamMembers.length || 0}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  borderColor: darkMode ? "#1e4173" : "",
                },
              }}
            >
              <TableCell>
                <Box sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                  {teamDetails.col1}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    ...styles.presenceHeader,
                    color: darkMode ? "#d3d0ca" : "black",
                  }}
                >
                  {teamDetails.col2}
                </Box>
              </TableCell>
              {!isMobile && teamDetails.checkInCol && (
                <TableCell>
                  <Box sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                    Check-In
                  </Box>
                </TableCell>
              )}
              <TableCell>
                <Box sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                  {teamDetails.col3}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.userId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  td: { borderColor: darkMode ? "#1e4173" : "" },
                }}
              >
                <TableCell sx={styles.tableCell}>
                  <ProfileDialog
                    userId={row.userId}
                    unreadMessages={row.user.unreadMessages}
                    name={row.user.name}
                    teamSize={teamMembers.length || 0}
                    memo={row.user.memo}
                  />
                </TableCell>
                <TableCell align="center">
                  <PresenceButton user={row.user} />
                </TableCell>
                {!isMobile && teamDetails.checkInCol && (
                  <TableCell sx={styles.checkInCell}>
                    <CheckInSelector user={row.user} />
                  </TableCell>
                )}
                <TableCell sx={styles.statusCell}>
                  <EditStatusDialog userId={row.userId} status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TeamTable.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  teamDetails: PropTypes.object.isRequired,
};
