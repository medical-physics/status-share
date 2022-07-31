import React from 'react';
import { GithubPicker } from 'react-color';
import styles from '../styles/components/AddTeamDialog.json';

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch } from 'react-redux';
import { addTeamAsync } from '../redux/slices/teamsSlice';

export default function AddTeamDialog () {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    team: '',
    priority: '1',
    color: '#1a237e',
    col1: 'Name',
    col2: 'Present',
    col3: 'Status',
    hyperlink: ''
  });

  const { team, priority, color, col1, col2, col3, hyperlink } = formValue;

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeamData = {
      team: team.trim(),
      priority: parseInt(priority.trim()),
      color: color.trim(),
      col1: col1.trim(),
      col2: col2.trim(),
      col3: col3.trim(),
      hyperlink: hyperlink.trim()
    };
    dispatch(addTeamAsync(newTeamData));
    handleClose();
    setFormValue({
      team: '',
      priority: '',
      color: '',
      col1: 'Name',
      col2: 'Present',
      col3: 'Status',
      hyperlink: ''
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

  const handleColorChange = (color) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        color: color.hex
      };
    });
  };

  return (
    <>
      <IconButton onClick={handleOpen} size='small' style={{ color: '#ffffff' }}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            Add a new team
            <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <Grid container sx={styles.dialogContainer}>
              <TextField
                required
                id='team'
                name='team'
                type='team'
                label='Team Name'
                value={team}
                onChange={handleChange}
                fullWidth
                sx={styles.textField}
              />
              <Grid item sx={styles.colorPicker}>
                <GithubPicker
                  color={color}
                  onChange={handleColorChange}
                />
              </Grid>
              <TextField
                required
                id='priority'
                name='priority'
                type='priority'
                label='Priority'
                value={priority}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id='col1'
                name='col1'
                type='col1'
                label='Col 1 Header'
                value={col1}
                onChange={handleChange}
                fullWidth
                sx={styles.textField}
              />
              <TextField
                id='col2'
                name='col2'
                type='col2'
                label='Col 2 Header'
                value={col2}
                onChange={handleChange}
                fullWidth
                sx={styles.textField}
              />
              <TextField
                id='col3'
                name='col3'
                type='col3'
                label='Col 3 Header'
                value={col3}
                onChange={handleChange}
                fullWidth
                sx={styles.textField}
              />
              <TextField
                id='hyperlink'
                name='hyperlink'
                type='hyperlink'
                label='Hyperlink'
                value={hyperlink}
                helperText='URLs must begin with https://'
                onChange={handleChange}
                fullWidth
                sx={styles.textField}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' color='secondary' type='submit'>
              <AddIcon sx={styles.icon} />create team
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
