import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import PrivateRoute from './util/PrivateRoute';
import LoginRoute from './util/LoginRoute';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

// Pages
import Home from './pages/home';
import Login from './pages/login';

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

axios.defaults.baseURL = 'https://localhost:5000';

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>} >
                <Route exact path='/' element={<Home/>} />
              </Route>
              <Route exact path='/login' element={<LoginRoute/>} >
                <Route exact path='/login' element={<Login/>} />
              </Route>
            </Routes>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
