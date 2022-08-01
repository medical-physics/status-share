import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import io from 'socket.io-client';

// Components
import PrivateRoute from './util/PrivateRoute';
import LoginRoute from './util/LoginRoute';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const BASE_ENDPOINT = 'https://localhost:5000';
axios.defaults.baseURL = BASE_ENDPOINT;

function App () {
  React.useEffect(() => {
    const newSocket = io(BASE_ENDPOINT);
    newSocket.on('users', (data) => { console.log(data); });
    newSocket.emit('getUsers');
    newSocket.on('teams', (data) => { console.log(data); });
    newSocket.emit('getTeams');
    return () => {
      newSocket.disconnect();
      newSocket.close();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
            </Route>
            <Route exact path='/login' element={<LoginRoute />}>
              <Route exact path='/login' element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
