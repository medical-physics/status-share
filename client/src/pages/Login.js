import React from 'react';
import { Helmet } from 'react-helmet';

// Components
import AppIcon from '../images/icon.png';
import BottomBar from '../components/BottomBar';
import NavBar from '../components/NavBar';

// MUI components
import {
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
  setRememberMe
} from '../redux/slices/accountSlice';

const styles = {
  form: {
    margin: '150px auto auto auto',
    textAlign: 'center'
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  textField: {
    margin: '20px auto auto auto',
    width: 300
  },
  button: {
    margin: '30px 10px 30px 10px'
  },
  customError: {
    color: 'red',
    fonstSize: '0.8rem'
  },
  image: {
    width: 45,
    height: 45,
    margin: 'auto 15px auto auto'
  },
  checkbox: {
    margin: '30px 20px 30px 20px'
  }
};

export default function Login (props) {
  const [errors, setErrors] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setStateRememberMe] = React.useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const appName = useSelector((state) => state.account.appName);

  React.useEffect(() => {
    localStorage.setItem('admin', 0);
    localStorage.setItem('viewOnly', 0);
    dispatch(getAppNameAsync());
  });

  /* static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.UI.errors) {
      return {
        errors: nextProps.UI.errors,
        ...prevState
      }
    } else {
      return prevState
    }
  }; */

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email.trim().toLowerCase().concat('@bccancer.bc.ca'),
      password
    };

    // Login persistence or not
    if (rememberMe) {
      // this.props.persistentLogin(userData, this.props.history);
      localStorage.setItem('rememberMe', 1);
      dispatch(setRememberMe());
    } else {
      loginUserAsync(userData, props.history);
      localStorage.setItem('rememberMe', 0);
    }
  };

  const handleCheck = (event) => {
    setStateRememberMe(event.target.value);
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
          <Paper elevation={3}>
            <Grid container alignItems='center' justify='center'>
              <Grid item>
                <img src={AppIcon} sx={styles.image} alt='Status Share' />
              </Grid>
              <Grid item>
                <Typography variant='h4' sx={styles.pageTitle}>
                  Sign In
                </Typography>
              </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                id='email'
                name='email'
                type='email'
                label='Username'
                sx={styles.textField}
                helperText={errors.email}
                error={!!errors.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                id='password'
                name='password'
                type='password'
                label='Password'
                sx={styles.textField}
                helperText={errors.password}
                error={!!errors.password}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.general && (
                <Typography variant='body2' sx={styles.customError}>
                  {errors.general}
                </Typography>
              )}
              <Grid sx={styles.textField}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={styles.button}
                  disabled={loading}
                >
                  Login
                  {loading && (
                    <CircularProgress size={30} sx={styles.progress} />
                  )}
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
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item sm />
        <BottomBar />
      </Grid>
    </div>
  );
}
