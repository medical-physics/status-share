import React from 'react';

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
  Toolbar
} from '@mui/material';
import {
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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

export default function LoadingTable () {
  return (
    <div>
      <Paper elevation={3}>
        <Toolbar>
          <Typography>
            <Box fontWeight='fontWeightBold' m={1}>
              Loading Team
            </Box>
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Present</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={styles.tableCell}>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item>
                        <IconButton size='small'>
                          <AccountCircleIcon />
                        </IconButton>
                      </Grid>
                    <Grid item sx={styles.box}>
                        Loading...
                      </Grid>
                  </Grid>
                </TableCell>
                <TableCell align='center'>
                  <IconButton size='small'>
                    <RadioButtonUncheckedIcon color='secondary' />
                  </IconButton>
                </TableCell>
                <TableCell sx={styles.statusCell}>
                  <Grid container alignItems='center' justify='space-between' spacing={1}>
                    <Grid item sx={styles.status}>
                        Loading...
                      </Grid>
                    <Grid item>
                        {!parseInt(localStorage.viewOnly) && (
                          <IconButton size='small'>
                            <EditIcon />
                          </IconButton>)}
                      </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
