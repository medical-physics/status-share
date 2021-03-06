import React from 'react';

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import {
  Edit as EditIcon,
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux stuff
import { useSelector } from 'react-redux';
import { editProfileAsync } from '../redux/slices/usersSlice';

const styles = {
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '92%',
    marginTop: 7
  },
  icon: {
    margin: 'auto 5px auto auto'
  },
  dialogContent: {
    textAlign: 'center',
    height: 280
  },
  memo: {
    marginTop: 30
  },
  otherText: {
    marginTop: 8
  },
  shortText: {
    marginTop: 8,
    marginRight: 15,
    width: 250
  }
};

export default function EditProfile () {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    profileName: '',
    phone: '',
    email: '',
    team: '',
    memo: '',
    priority: ''
  });

  const { profileName, phone, email, team, memo, priority } = formValue;

  const user = useSelector((state) => state.users.user);

  const handleOpen = () => {
    setOpen(true);
    mapUserToState();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mapUserToState = () => {
    setFormValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
      memo: user.memo,
      team: user.team,
      priority: user.priority
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name: profileName,
      phone,
      email,
      memo,
      team: team.trim(),
      userId: user.userId,
      priority: parseInt(priority)
    };
    editProfileAsync(profileData);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} variant='outlined' color='secondary'>
        <EditIcon sx={styles.icon} />  edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          Edit {user.name}"s profile
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <Grid container>
              <Grid item>
                <TextField
                  id='phone'
                  name='phone'
                  type='phone'
                  label='Phone'
                  placeholder={user.phone}
                  value={phone}
                  onChange={handleChange}
                  sx={styles.shortText}
                />
              </Grid>
              <Grid item>
                <TextField
                  id='email'
                  name='email'
                  type='email'
                  label='Email'
                  placeholder={user.email}
                  value={email}
                  onChange={handleChange}
                  sx={styles.shortText}
                />
              </Grid>
            </Grid>
            <TextField
              id='memo'
              name='memo'
              type='memo'
              label='Memo'
              variant='filled'
              multiline
              rows='2'
              placeholder={user.memo}
              value={memo}
              onChange={handleChange}
              fullWidth
              sx={styles.memo}
            />
            {Boolean(parseInt(localStorage.getItem('admin'))) && (
              <>
                <TextField
                  name='profileName'
                  label='Name'
                  placeholder={user.name}
                  value={profileName}
                  onChange={handleChange}
                  fullWidth
                  sx={styles.otherText}
                />
                <TextField
                  id='priority'
                  name='priority'
                  type='priority'
                  label='Priority (e.g. 1)'
                  placeholder={user.priority}
                  value={priority}
                  onChange={handleChange}
                  fullWidth
                  sx={styles.otherText}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' color='secondary' type='submit'>
              <SendIcon sx={styles.icon} />submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
