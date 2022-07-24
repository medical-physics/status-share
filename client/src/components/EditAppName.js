import React from 'react';

// MUI components
import {
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import {
  Send as SendIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { setAppNameAsync } from '../redux/slices/accountSlice';

const styles = {
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '90%',
    marginTop: 7
  },
  icon: {
    margin: '5px 8px auto 15px'
  },
  dialogContent: {
    height: 80
  },
  textField: {
    marginTop: 10
  }
};

export default function EditAppName () {
  const [open, setOpen] = React.useState(false);
  const [stateAppName, setStateAppName] = React.useState('');

  const dispatch = useDispatch();
  const appName = useSelector((state) => state.account.appName);

  const handleOpen = () => {
    setStateAppName(appName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setAppNameAsync(stateAppName));
    handleClose();
  };

  const handleChange = (event) => {
    setStateAppName(event.target.value);
  };

  return (
    <>
      <IconButton onClick={handleOpen} size='small' style={{ color: '#ffffff' }}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        <DialogTitle>Change web app name</DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>

            <TextField
              id='appName'
              name='appName'
              type='appName'
              variant='filled'
              size='small'
              fullWidth
              placeholder={appName}
              value={stateAppName}
              onChange={handleChange}
              sx={styles.textField}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={handleSubmit} type='submit'>
              <SendIcon sx={styles.icon} />submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
