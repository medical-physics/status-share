import React from 'react';
import PropTypes from 'prop-types';

// MUI components
import {
  IconButton
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch } from 'react-redux';
import { markPresentAsync, markNotPresentAsync } from '../redux/slices/usersSlice';

export default function PresenceButton (props) {
  const userId = props.user._id;
  const present = props.user.present;

  const dispatch = useDispatch();

  const uncheckButton = () => {
    if (!parseInt(localStorage.getItem('viewOnly'))) {
      dispatch(markNotPresentAsync(userId));
    }
  };

  const checkButton = () => {
    if (!parseInt(localStorage.getItem('viewOnly'))) {
      dispatch(markPresentAsync(userId));
    }
  };

  const presenceButton = present
    ? (
      <IconButton size='small' onClick={uncheckButton}>
        <CheckCircleIcon color='secondary' />
      </IconButton>
      )
    : (
      <IconButton size='small' onClick={checkButton}>
        <RadioButtonUncheckedIcon color='secondary' />
      </IconButton>
      );

  return (
    presenceButton
  );
}

PresenceButton.propTypes = {
  user: PropTypes.object.isRequired
};
