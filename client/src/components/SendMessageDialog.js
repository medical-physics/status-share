import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/SendMessageDialog.json';

// MUI components
import {
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  AccountBox as AccountBoxIcon,
  AlternateEmail as AlternateEmailIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { addMessageAsync } from '../redux/slices/mailboxSlice';

export default function SendMessageDialog (props) {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    senderName: '',
    senderContact: '',
    subject: '',
    message: ''
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const { senderName, senderContact, subject, message } = formValue;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValue({
      senderName: '',
      senderContact: '',
      subject: '',
      message: ''
    });
    props.onClose();
  };

  const handleSubmit = () => {
    const newMessageData = {
      senderName: senderName.trim(),
      senderContact: senderContact.trim(),
      subject: subject.trim(),
      message: message.trim()
    };

    dispatch(
      addMessageAsync({
        newMessageData,
        userId: props.userId
      })
    );
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  return (
    <>
      <Button onClick={handleOpen} style={{ color: '#388e3c' }} variant='outlined'>
        <SendIcon sx={styles.buttonIcon} /> message
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Send message to ${user.name}`}
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <TextField
            id='senderName'
            name='senderName'
            type='senderName'
            label='Sender Name'
            value={senderName}
            onChange={handleChange}
            fullWidth
            sx={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBoxIcon style={{ color: '#388e3c' }} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            id='senderContact'
            name='senderContact'
            type='senderContact'
            label='Sender Contact'
            value={senderContact}
            onChange={handleChange}
            fullWidth
            sx={styles.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AlternateEmailIcon style={{ color: '#388e3c' }} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            id='subject'
            name='subject'
            type='subject'
            label='Subject'
            value={subject}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: '40px' }}
            variant='outlined'
          />
          <TextField
            id='message'
            name='message'
            type='message'
            label='Message'
            variant='filled'
            multiline
            rows='4'
            value={message}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: '9px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='outlined' style={{ color: '#388e3c' }} type='submit'>
            <SendIcon sx={styles.icon} />send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SendMessageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
