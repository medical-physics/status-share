import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/InboxDialog.json';

// Components
import InboxTable from './InboxTable';

// MUI components
import {
  Grid,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  AllInbox as AllInboxIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { getMailboxAsync } from '../redux/slices/mailboxSlice';

export default function InboxDialog (props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { name } = user;
  const loading = useSelector((state) => state.mailbox.loadingMailbox);

  const handleOpen = () => {
    dispatch(getMailboxAsync(props.userId));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
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
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Inbox: ${name}`}
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <InboxTable />
        </DialogContent>
      </div>
      );

  return (
    <>
      <Button onClick={handleOpen} style={{ color: '#388e3c' }} variant='outlined'>
        <AllInboxIcon sx={styles.buttonIcon} /> inbox
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

InboxDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
