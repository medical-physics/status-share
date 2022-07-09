import React from 'react';

// MUI components
import {
  AppBar,
  Toolbar,
  Grid,
  Typography
} from '@mui/material';

// Redux stuff
import { useSelector } from 'react-redux';

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0
  }
};

export default function BottomBar () {
  const truncatedAppName = useSelector((state) => state.account.truncatedAppName);

  const text = truncatedAppName
    ? (
      <Typography variant='overline'>
        © 2020 BC Cancer: Medical Physics...
      </Typography>
      )
    : (
      <Typography variant='overline'>
        © 2020 BC Cancer: Medical Physics. All rights reserved.
      </Typography>
      );
  return (
    <AppBar sx={styles.appBar} color='inherit' position='fixed'>
      <Toolbar variant='dense'>
        <Grid justify='flex-start' container>
          <Grid item>
            {text}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
