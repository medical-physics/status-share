import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/pages/Login.json';

// Components
import AppIcon from '../images/icon.png';
import BottomBar from '../components/BottomBar';
import NavBar from '../components/NavBar';

// MUI components
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Checkbox,
  FormControlLabel
} from '@mui/material';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import {
  loginUserAsync,
  getAppNameAsync,
  setRememberMe,
  checkingAuth,
  logoutUser
} from '../redux/slices/accountSlice';

export default function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setStateRememberMe] = React.useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const appName = useSelector((state) => state.account.appName);
  const errors = useSelector((state) => state.account.errors);

  React.useEffect(() => {
    localStorage.clear();
    dispatch(logoutUser());
    dispatch(getAppNameAsync());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email.trim().toLowerCase().concat('@bccancer.bc.ca'),
      password
    };

    if (rememberMe) {
      dispatch(setRememberMe());
    }
    localStorage.setItem('rememberMe', rememberMe);
    dispatch(checkingAuth());
    dispatch(loginUserAsync(userData));
  };

  const handleCheck = (event) => {
    setStateRememberMe(event.target.checked);
  };

  return (
    <div>
      <Helmet>
        <title>{appName} | Login</title>
      </Helmet>
      <Grid container sx={styles.form} justify='center'>
        <NavBar />
        <Grid item sm />
        <Grid item sm>
          <Paper elevation={4} sx={styles.formPaper}>
            <Box sx={styles.titleBox}>
              <Box sx={styles.titleSubBox}>
                <img src={AppIcon} style={styles.image} alt='Status Share' />
              </Box>
              <Box sx={styles.titleSubBox}>
                <Typography variant='h4' sx={styles.pageTitle}>
                  Sign In
                </Typography>
              </Box>
            </Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                id='email'
                name='email'
                type='email'
                label='Username'
                sx={styles.textField}
                helperText={errors?.email}
                error={!!errors?.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                id='password'
                name='password'
                type='password'
                label='Password'
                sx={styles.textField}
                helperText={errors?.password}
                error={!!errors?.password}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors?.general && (
                <Typography variant='body2' sx={styles.customError}>
                  {errors?.general}
                </Typography>
              )}
              <Box sx={styles.submission}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={styles.button}
                  disabled={loading}
                >
                  <Grid container sx={styles.buttonContainer}>
                    Login
                    {loading && (
                      <CircularProgress size={15} thickness={5} sx={styles.progress} />
                    )}
                  </Grid>
                </Button>
                <FormControlLabel
                  control={<Checkbox
                    name='rememberMe'
                    checked={rememberMe}
                    onChange={handleCheck}
                    color='primary'
                           />}
                  label='Remember Me'
                  sx={styles.checkbox}
                />
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item sm />
        <BottomBar />
      </Grid>
    </div>
  );
}
