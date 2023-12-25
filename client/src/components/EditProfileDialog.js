import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/EditProfileDialog.json";

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editProfileAsync, deleteUserAsync } from "../redux/slices/usersSlice";

export default function EditProfileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    profileName: "",
    phone: "",
    email: "",
    team: "",
    memo: "",
    priority: "",
  });

  const { profileName, phone, email, team, memo, priority } = formValue;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const darkMode = useSelector((state) => state.account.darkMode);

  const handleOpen = () => {
    setOpen(true);
    mapUserToState();
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const mapUserToState = () => {
    setFormValue({
      profileName: user.name,
      phone: user.phone,
      email: user.email,
      memo: user.memo,
      team: user.team,
      priority: user.priority.toString(),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
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
      userId: user._id,
      priority: parseInt(priority),
    };
    dispatch(editProfileAsync(profileData));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteUserAsync(user._id));
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={handleOpen}
        type="submit"
        sx={{
          color: darkMode ? "#31304D" : "#EEEEEE",
          padding: "5px 10px 3px 7px",
          "&:hover": { backgroundColor: "#2FA2B9" },
          marginRight: "5px",
          marginBottom: "1vh",
        }}
      >
        <div className="button-content">
          <EditIcon
            sx={{ ...styles.icon, marginTop: "-1px", marginRight: "5px" }}
          />
          edit
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Edit ${user.name}'s profile`}
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <Grid container sx={styles.shortTextContainer}>
              <TextField
                id="phone"
                name="phone"
                type="phone"
                label="Phone"
                placeholder={user.phone}
                value={phone}
                onChange={handleChange}
                sx={styles.shortText}
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder={user.email}
                value={email}
                onChange={handleChange}
                sx={styles.shortText}
              />
            </Grid>
            <TextField
              id="memo"
              name="memo"
              type="memo"
              label="Memo"
              variant="filled"
              multiline
              rows="2"
              placeholder={user.memo}
              value={memo}
              onChange={handleChange}
              fullWidth
              sx={styles.memo}
            />
            {JSON.parse(localStorage.getItem("admin")) && (
              <>
                <TextField
                  name="profileName"
                  label="Name"
                  placeholder={user.name}
                  value={profileName}
                  onChange={handleChange}
                  fullWidth
                  sx={styles.otherText}
                />
                <TextField
                  id="priority"
                  name="priority"
                  type="priority"
                  label="Priority (e.g. 1)"
                  placeholder={user.priority.toString()}
                  value={priority}
                  onChange={handleChange}
                  fullWidth
                  sx={styles.otherText}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            {JSON.parse(localStorage.getItem("admin")) && (
              <Button
                onClick={handleDelete}
                style={{ color: "#ef5350" }}
                variant="outlined"
              >
                <DeleteIcon sx={styles.buttonIcon} />
                delete
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              variant="outlined"
              color="secondary"
              type="submit"
            >
              <SendIcon sx={styles.icon} />
              submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

EditProfileDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};
