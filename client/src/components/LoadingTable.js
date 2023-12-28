import React from "react";
import styles from "../styles/components/team-table.json";

// MUI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Grid,
  Toolbar,
} from "@mui/material";
import {
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function LoadingTable() {
  const darkMode = useSelector((state) => state.account.darkMode);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: darkMode ? "#161b22" : "",
        border: "1px solid",
        borderColor: darkMode ? "#1e4173" : "#7A7A7A",
      }}
    >
      <Toolbar>
        <Typography component="div">
          <Box
            fontWeight="fontWeightBold"
            m={1}
            sx={{ color: darkMode ? "#d3d0ca" : "black" }}
          >
            Loading Team
          </Box>
        </Typography>
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
              <TableCell sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                Present
              </TableCell>
              <TableCell sx={{ color: darkMode ? "#d3d0ca" : "black" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                td: { borderColor: darkMode ? "#1e4173" : "" },
              }}
            >
              <TableCell sx={styles.tableCell}>
                <div style={{ color: darkMode ? "#d3d0ca" : "black" }}>
                  <IconButton
                    size="small"
                    sx={{ color: darkMode ? "#d3d0ca" : "black" }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  Loading...
                </div>
              </TableCell>
              <TableCell align="center">
                <IconButton size="small">
                  <RadioButtonUncheckedIcon color="secondary" />
                </IconButton>
              </TableCell>
              <TableCell sx={styles.statusCell}>
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  spacing={1}
                >
                  <Grid
                    item
                    sx={{
                      ...styles.status,
                      color: darkMode ? "#d3d0ca" : "black",
                    }}
                  >
                    Loading...
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
