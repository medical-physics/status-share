import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Components
import ProfileButton from './ProfileButton';
import EditProfile from './EditProfile';
import SendMessageDialog from './SendMessageDialog';
import InboxDialog from './InboxDialog';

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
  Delete as DeleteIcon,
  Group as GroupIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux stuff
import { useSelector } from 'react-redux';
import { getUserAsync, deleteUserAsync } from '../redux/slices/usersSlice';

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
    margin: '5px 8px auto 15px'
  },
  statusText: {
    margin: '20px auto 0px 10px'
  },
  text2: {
    margin: '10px auto 0px 10px'
  },
  dialogContent: {
    height: 250
  },
  buttonIcon: {
    margin: 'auto 5px auto auto'
  }
};

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProfileDialog (props) {
  const [open, setOpen] = React.useState(false);

  const { unreadMessages, userId } = props;

  const { user: { name, status, statusTime, phone, email, team, memo } } = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.UI.loading);

  const handleOpen = () => {
    setOpen(true);
    getUserAsync(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteUserAsync(userId);
    handleClose();
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
        <DialogTitle>{name}</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container justify='flex-start'>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><PhoneIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  <Typography>{phone}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><EmailIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  <Typography>{email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><GroupIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  <Typography>{capitalize(String(team))}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={styles.statusText}>
                <Box fontWeight='fontWeightBold' m={1}>Status: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.statusText} noWrap>{status}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={styles.text2}>
                <Box fontWeight='fontWeightBold' m={1}>Since: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text2}>{dayjs(statusTime).format('h:mm a, MMMM DD YYYY')}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography sx={styles.text2}>
                <Box fontWeight='fontWeightBold' m={1}>Memo: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text2}>{memo}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {Boolean(parseInt(localStorage.admin)) && (
            <Button onClick={handleDelete} style={{ color: '#ef5350' }} variant='outlined'>
              <DeleteIcon sx={styles.buttonIcon} />delete
            </Button>)}
          {!parseInt(localStorage.viewOnly) && (<InboxDialog userId={userId} onClose={handleClose} />)}
          <SendMessageDialog userId={userId} onClose={handleClose} />
          {!parseInt(localStorage.viewOnly) && (<EditProfile />)}
        </DialogActions>
      </div>
      );

  return (
    <>
      <ProfileButton onClick={handleOpen} unreadMessages={unreadMessages} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

ProfileDialog.propTypes = {
  userId: PropTypes.string.isRequired,
  unreadMessages: PropTypes.number.isRequired
};
