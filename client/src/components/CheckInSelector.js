import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/CheckInSelector.json';

// MUI components
import {
  Grid,
  Slider
} from '@mui/material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { setCheckInPeriodAsync } from '../redux/slices/usersSlice';
import { createSelector } from 'reselect';

const selectUser = createSelector(
  [
    (state) => state.users.users,
    (state, userId) => userId
  ],
  (users, userId) => {
    const index = users.findIndex((user) => user._id === userId);
    return users[index].checkIn;
  }
);

const marks = [
  { value: 0 }, // None
  { value: 1 }, // AM
  { value: 2 } // PM
];

export default function CheckInSelector (props) {
  const userId = props.user._id;
  const subscribedCheckInPeriod = useSelector((state) => selectUser(state, userId));
  const [checkInPeriod, setCheckInPeriod] = React.useState(props.user.checkIn);
  const [checkInText, setCheckInText] = React.useState('––');
  const [styling, setStyling] = React.useState(styles.selectNone);

  const dispatch = useDispatch();

  React.useEffect(() => {
    switch (checkInPeriod) {
      case 0:
        setCheckInText('––');
        setStyling(styles.selectNone);
        break;
      case 1:
        setCheckInText('AM');
        setStyling(styles.selectAM);
        break;
      case 2:
        setCheckInText('PM');
        setStyling(styles.selectPM);
        break;
      default:
        setStyling(styles.selectNone);
    }
  }, [checkInPeriod]);

  React.useEffect(() => {
    setCheckInPeriod(subscribedCheckInPeriod);
  }, [subscribedCheckInPeriod, setCheckInPeriod]);

  const handleChange = (event) => {
    setCheckInPeriod(event.target.value);
    if (!JSON.parse(localStorage.getItem('viewOnly'))) {
      dispatch(setCheckInPeriodAsync({ userId, checkIn: event.target.value }));
    }
  };

  return (
    <Grid container sx={styles.tableCell}>
      <Grid item>
        <Slider
          value={checkInPeriod}
          onChange={handleChange}
          step={1}
          track={false}
          marks={marks}
          min={0}
          max={2}
          sx={styling}
        />
      </Grid>
      <Grid item sx={styles.checkInText}>
        {checkInText}
      </Grid>
    </Grid>
  );
}

CheckInSelector.propTypes = {
  user: PropTypes.object.isRequired
};
