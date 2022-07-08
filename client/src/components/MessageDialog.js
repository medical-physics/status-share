import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import {
  DraftsOutlined as DraftsOutlinedIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
  AccountBox as AccountBoxIcon,
  AlternateEmail as AlternateEmailIcon
} from '@mui/icons-material';

// Redux stuff
import { useSelector } from 'react-redux';
import { markMessageReadAsync, deleteMessageAsync, getMessageAsync } from '../redux/slices/mailboxSlice';

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
  text1: {
    margin: '20px auto 0px 10px'
  },
  text2: {
    margin: '10px auto 0px 10px'
  },
  icon: {
    margin: '20px auto 0px 10px'
  },
  dialogContent: {
    height: 350
  },
  buttonIcon: {
    margin: 'auto 5px auto auto'
  }
};

export default function MessageDialog (props) {
  const [open, setOpen] = React.useState(false);

  const { messageId, userId, readStatus } = props;

  const message = useSelector((state) => state.mailbox.message);
  const loading = useSelector((state) => state.UI.loading);

  const handleOpen = () => {
    setOpen(true);
    getMessageAsync(messageId);

    if (!readStatus) {
      markMessageReadAsync({ messageId, userId });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteMessageAsync({ messageId, userId });
    handleClose();
  };

  const renderButton = () => {
    if (readStatus) {
      return (
        <IconButton onClick={handleOpen} style={{ color: '#388e3c' }} size='small'>
          <DraftsOutlinedIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={handleOpen} style={{ color: '#388e3c' }} size='small'>
          <MailIcon />
        </IconButton>
      );
    }
  };

  const dialogMarkup = loading
    ? (
      <div>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <div sx={styles.spinnerDiv}>
            <CircularProgress size={80} thickness={2} />
          </div>
        </DialogContent>
      </div>
      )
    : (
      <div>
        <DialogTitle>{message.subject}</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container>
            <Grid item>
              <AccountBoxIcon style={{ color: '#388e3c' }} sx={styles.icon} />
            </Grid>
            <Grid item>
              <Typography sx={styles.text1} noWrap>{message.senderName}</Typography>
            </Grid>
            <Grid item>
              <AlternateEmailIcon style={{ color: '#388e3c' }} sx={styles.icon} />
            </Grid>
            <Grid item>
              <Typography sx={styles.text1} noWrap>{message.senderContact}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={styles.text1}>
                <Box fontWeight='fontWeightBold' m={1}>Sent at: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text1}>{dayjs(message.timestamp).format('h:mm a, MMMM DD YYYY')}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={styles.text2}>
                <Box fontWeight='fontWeightBold' m={1}>Message: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text2}>{message.message}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} style={{ color: '#ef5350' }} variant='outlined'>
            <DeleteIcon sx={styles.buttonIcon} />delete
          </Button>
        </DialogActions>
      </div>
      );

  return (
    <>
      {renderButton()}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

MessageDialog.propTypes = {
  messageId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  readStatus: PropTypes.bool.isRequired
};
