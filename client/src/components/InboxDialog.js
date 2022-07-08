import React from 'react';
import PropTypes from 'prop-types';

// Components
import InboxTable from './InboxTable';

// MUI components
import {
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
import { useSelector } from 'react-redux';
import { getMailboxAsync } from '../redux/slices/mailboxSlice';

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
  dialogContent: {
    height: 450
  },
  buttonIcon: {
    margin: 'auto 5px auto auto'
  }
};

export default function InboxDialog (props) {
  const [open, setOpen] = React.useState(false);

  const { user: { name } } = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.mailbox.loadingMailbox);

  const handleOpen = () => {
    setOpen(true);
    getMailboxAsync(props.userId);
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
        <DialogTitle>Inbox: {name}</DialogTitle>
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
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

InboxDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
