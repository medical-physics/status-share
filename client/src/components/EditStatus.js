import React from 'react';
import PropTypes from 'prop-types';

// MUI components
import {
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
  Edit as EditIcon,
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, updateStatusAsync } from '../redux/slices/usersSlice';

const styles = {
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '92%',
    marginTop: 7
  },
  icon: {
    margin: '1px 8px auto 8px'
  },
  statusText: {
    margin: '20px auto 0px 10px'
  },
  text2: {
    margin: '10px auto 0px 10px'
  },
  dialogContent: {
    height: 80
  },
  textField: {
    marginTop: 10
  }
};

export default function EditStatus (props) {
  const [status, setStatus] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { userId } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.UI.loading);

  const mapUserDetailsToState = (focusedUser) => {
    setStatus(checkUser(focusedUser));
  };

  const checkUser = (focusedUser) => {
    if (userId === focusedUser._id) {
      return focusedUser.status;
    }
  };

  const handleOpen = () => {
    setOpen(true);
    dispatch(getUserAsync(userId))
      .then(res => {
        mapUserDetailsToState(res.payload);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const statusData = {
      status,
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
    setStatus(event.target.value);
  };

  const dialogMarkup = loading
    ? (
      <>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <div sx={styles.spinnerDiv}>
            <CircularProgress size={40} thickness={2} />
          </div>
        </DialogContent>
      </>
      )
    : (
      <>
        <DialogTitle>Edit {user.name}'s status</DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              id='status'
              name='status'
              type='status'
              variant='filled'
              size='small'
              fullWidth
              placeholder={user.status}
              value={status}
              onChange={handleChange}
              sx={styles.textField}
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
      <IconButton onClick={handleOpen} size='small'>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

EditStatus.propTypes = {
  userId: PropTypes.string.isRequired
};
