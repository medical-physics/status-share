import React from 'react';
import styles from '../styles/components/TeamTable.json';

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
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

export default function LoadingTable () {
  return (
    <>
      <Paper elevation={3}>
        <Toolbar>
          <Typography component='div'>
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
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
