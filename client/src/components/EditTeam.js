import React from 'react';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';

// MUI components
import {
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Redux stuff
import { useDispatch } from 'react-redux';
import { updateTeamAsync, deleteTeamAsync } from '../redux/slices/teamsSlice';

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
  statusText: {
    margin: '20px auto 0px 10px'
  },
  text2: {
    margin: '10px auto 0px 10px'
  },
  dialogContent: {
    height: 400
  },
  textField: {
    margin: '10px 20px auto 20px'
  }
};

export default function EditTeam (props) {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    team: '',
    priority: '',
    color: '',
    col1: 'Name',
    col2: 'Present',
    col3: 'Status'
  });

  const { teamDetails } = props;
  const { team, priority, color, col1, col2, col3 } = formValue;

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      team: teamDetails.team,
      priority: teamDetails.priority.toString(),
      color: teamDetails.color,
      col1: teamDetails.col1,
      col2: teamDetails.col2,
      col3: teamDetails.col3
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const teamData = {
      ...formValue,
      prevTeam: teamDetails.team,
      priority: parseInt(priority)
    };
    dispatch(updateTeamAsync({ teamId: teamDetails._id, teamData }));
    handleClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteTeamAsync(teamDetails._id));
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

  const handleColorChange = (color) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        color: color.hex
      };
    });
  };

  const dialogMarkup = (
    <>
      <DialogTitle>Edit {teamDetails.team}</DialogTitle>
      <form>
        <DialogContent sx={styles.dialogContent}>
          <Grid container justify='center'>
            <Grid item>
              <TextField
                id='team'
                name='team'
                type='team'
                label='Team Name'
                placeholder={teamDetails.team}
                value={team}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item style={{ marginTop: 15 }}>
              <GithubPicker
                color={color}
                onChange={handleColorChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id='priority'
                name='priority'
                type='priority'
                label='Priority'
                placeholder={teamDetails.priority.toString(10)}
                value={priority}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item>
              <TextField
                id='col1'
                name='col1'
                type='col1'
                label='Col 1 Header'
                placeholder={teamDetails.col1}
                value={col1}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item>
              <TextField
                id='col2'
                name='col2'
                type='col2'
                label='Col 2 Header'
                placeholder={teamDetails.col2}
                value={col2}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
            <Grid item>
              <TextField
                id='col3'
                name='col3'
                type='col3'
                label='Col 3 Header'
                placeholder={teamDetails.col3}
                value={col3}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleDelete}>
            <DeleteIcon sx={styles.icon} />delete team
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleSubmit} type='submit'>
            <SendIcon sx={styles.icon} />edit team
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <IconButton onClick={handleClose} sx={styles.closeButton} size='small'>
          <CloseIcon />
        </IconButton>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

EditTeam.propTypes = {
  teamDetails: PropTypes.object.isRequired
};
