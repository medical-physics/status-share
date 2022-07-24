import React from 'react';
import { Link } from 'react-router-dom';

// Components
import EditAppName from './EditAppName';
import AddTeamDialog from './AddTeamDialog';

// MUI components
import {
  AppBar,
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
      <Typography noWrap style={{ margin: '0px 0px 0px 5px' }} variant='overline'>
        {appName.slice(0, 12).concat('...')}
      </Typography>
      )
    : (
      <Typography noWrap style={{ margin: '0px 0px 0px 5px' }} variant='overline'>
        {appName}
      </Typography>
      );

  return (
    <AppBar style={{ maxHeight: 50 }}>
      <Toolbar variant='dense'>
        <Grid justify='space-between' alignItems='center' container>
          <Grid item>
            <Grid container alignItems='center'>
              <Grid item>
                <IconButton size='small'>
                  <CheckCircleOutlineIcon style={{ color: '#ffffff' }} />
                </IconButton>
              </Grid>
              <Grid item>
                {title}
              </Grid>
              <Grid item>
                {(JSON.parse(localStorage.getItem('admin')) || admin) && (<><EditAppName /><AddTeamDialog /></>)}
              </Grid>
            </Grid>
          </Grid>
          {authenticated && (
            <Grid item>
              <Button onClick={handleLogout} color='inherit' variant='outlined' size='small' component={Link} to='/login'>
                Sign Out
              </Button>
            </Grid>)}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
