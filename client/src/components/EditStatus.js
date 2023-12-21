import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/EditStatus.json';

// MUI components
import {
  Box,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, updateStatusAsync } from '../redux/slices/usersSlice';

const DEFAULT_STATUS = <>&nbsp;&nbsp;&nbsp;</>;

export default function EditStatus (props) {
  const [statusState, setStatusState] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { userId, status } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.UI.loading);

  const mapUserDetailsToState = (focusedUser) => {
    setStatusState(checkUser(focusedUser));
  };

  const checkUser = (focusedUser) => {
    if (userId === focusedUser._id) {
      return focusedUser.status;
    }
  };

  const handleOpen = () => {
    if (!JSON.parse(localStorage.getItem('viewOnly'))) {
      setOpen(true);
      dispatch(getUserAsync(userId))
        .then(res => {
          mapUserDetailsToState(res.payload);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const statusData = {
      status: statusState,
      statusTime: new Date().toString(),
      userId
    };
    dispatch(updateStatusAsync({ userId, statusData }));
    handleClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const statusData = {
      status: '',
      statusTime: new Date().toString(),
      userId
    };
    dispatch(updateStatusAsync({ userId, statusData }));
    handleClose();
  };

  const handleChange = (event) => {
    setStatusState(event.target.value);
  };

  const dialogMarkup = loading
    ? (
      <>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid sx={styles.spinnerGrid}>
            <div sx={styles.spinnerDiv}>
              <CircularProgress size={50} thickness={3} />
            </div>
          </Grid>
        </DialogContent>
      </>
      )
    : (
      <>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Edit ${user.name}'s status`}
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              id='status'
              name='status'
              type='status'
              variant='filled'
              fullWidth
              placeholder={status}
              value={statusState}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleDelete}>
              <DeleteIcon sx={styles.icon} />clear
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleSubmit} type='submit'>
              <SendIcon sx={styles.icon} />submit
            </Button>
          </DialogActions>
        </form>
      </>
      );

  return (
    <>
      <Box onClick={handleOpen} sx={styles.statusBox}>
        <div style={styles.statusText}>
          {status || DEFAULT_STATUS}
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

EditStatus.propTypes = {
  userId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};
