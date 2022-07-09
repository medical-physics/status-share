import React from 'react';
import PropTypes from 'prop-types';

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Redux stuff
import { addUserAsync } from '../redux/slices/usersSlice';

const styles = {
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '90%',
    marginTop: 7
  },
  icon: {
    margin: 'auto 5px auto auto'
  },
  dialogContent: {
    textAlign: 'center',
    height: 250
  },
  memo: {
    marginTop: 30
  },
  otherText: {
    marginTop: 8
  }
};

export default function AddUserDialog (props) {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    userName: '',
    email: '',
    phone: '',
    team: '',
    teamId: '',
    priority: '1'
  });

  const { userName, email, phone, team, priority } = formValue;

  const { teamName, teamId } = props;

  const handleOpen = () => {
    setOpen(true);
    setFormValue((prevState) => {
      return {
        ...prevState,
        team: teamName,
        teamId: teamId
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      name: userName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      team: team.trim(),
      teamId: teamId.trim(),
      priority: parseInt(priority.trim())
    };
    addUserAsync(newUserData);
    handleClose();
    setFormValue({
      userNme: '',
      email: '',
      phone: '',
      team: '',
      teamId: '',
      priority: ''
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

  return (
    <>
      <IconButton onClick={handleOpen} size='small'>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          Add new user to {teamName}
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              required
              id='name'
              name='userName'
              type='name'
              label='Name'
              value={userName}
              onChange={handleChange}
              sx={styles.otherText}
              fullWidth
            />
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              value={email}
              onChange={handleChange}
              sx={styles.otherText}
              fullWidth
            />
            <TextField
              id='phone'
              name='phone'
              type='phone'
              label='Phone'
              value={phone}
              onChange={handleChange}
              sx={styles.otherText}
              fullWidth
            />
            <TextField
              required
              id='priority'
              name='priority'
              type='priority'
              label='Priority'
              value={priority}
              onChange={handleChange}
              sx={styles.otherText}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' color='secondary' type='submit'>
              <AddIcon sx={styles.icon} />create user
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

AddUserDialog.propTypes = {
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired
};
