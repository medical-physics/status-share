import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/NavBar.json';

// Components
import EditAppName from './EditAppName';
import AddTeamDialog from './AddTeamDialog';

// MUI components
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import {
  CheckCircleOutline as CheckCircleOutlineIcon
} from '@mui/icons-material';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, truncateAppName, detruncateAppName } from '../redux/slices/accountSlice';

export default function NavBar () {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.account.authenticated);
  const appName = useSelector((state) => state.account.appName);
  const admin = useSelector((state) => state.account.admin);
  const truncatedAppName = useSelector((state) => state.account.truncatedAppName);

  React.useEffect(() => {
    function updateTitle () {
      if (window.innerWidth < 550) {
        dispatch(truncateAppName());
      } else {
        dispatch(detruncateAppName());
      }
    }

    updateTitle();
    window.addEventListener('resize', updateTitle);

    return function cleanup () {
      window.removeEventListener('resize', updateTitle);
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const title = truncatedAppName
    ? (
      <Typography noWrap style={styles.margin} variant='overline'>
        {appName.slice(0, 12).concat('...')}
      </Typography>
      )
    : (
      <Typography noWrap style={styles.margin} variant='overline'>
        {appName}
      </Typography>
      );

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar variant='dense'>
        <Box sx={styles.barBox}>
          <Box>
            <Grid container alignItems='center'>
              <Grid item>
                <IconButton size='small'>
                  <CheckCircleOutlineIcon sx={styles.icon} />
                </IconButton>
              </Grid>
              <Grid item>
                {title}
              </Grid>
              <Grid item>
                {(JSON.parse(localStorage.getItem('admin')) || admin) && (<><EditAppName /><AddTeamDialog /></>)}
              </Grid>
            </Grid>
          </Box>
          {authenticated && (
            <Button onClick={handleLogout} color='inherit' variant='outlined' size='small' component={Link} to='/login'>
              Sign Out
            </Button>)}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
