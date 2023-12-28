import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/edit-profile-dialog.json";
import "../styles/components/edit-profile-dialog.css";

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
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

  const { teamSize } = props;
  const { profileName, phone, email, team, memo, priority } = formValue;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    setOpen(true);
    mapUserToState();
  };

  const handleClose = () => {
    setOpen(false);
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
          padding: isMobile ? "5px 9px 3px 9px" : "5px 9px 2px 9px",
          "&:hover": { backgroundColor: "#098595" },
          marginLeft: "15px",
          marginBottom: "1vh",
        }}
      >
        <AccountCircleIcon
          sx={{ ...styles.icon, margin: "-1px 5px auto 3px" }}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#232D3F" : "",
            border: "1px solid",
            borderRadius: "7px",
            borderColor: darkMode ? "#7A7A7A" : "",
            width: isMobile ? "90%" : "400px",
          },
          "& .MuiDialogTitle-root": {
            backgroundColor: darkMode ? "#232D3F" : "#EEEEEE",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: darkMode ? "#232D3F" : "#EEEEEE",
          },
          "& .MuiDialogActions-root": {
            backgroundColor: darkMode ? "#232D3F" : "#EEEEEE",
          },
        }}
      >
        <DialogTitle>
          <Grid
            sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}
          >
            {`Edit ${user.name}'s profile`}
            <IconButton onClick={handleClose} size="small">
              <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <input
              className={
                "profile-input text-input" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Name"
              name="profileName"
              type="text"
              value={profileName}
              onChange={handleChange}
            />
            <input
              className={
                "profile-input text-input" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Email"
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
              style={{ marginTop: "15px" }}
            />
            <input
              className={
                "profile-input text-input" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Phone"
              name="phone"
              type="text"
              value={phone}
              onChange={handleChange}
              style={{ marginTop: "15px" }}
            />
            {JSON.parse(localStorage.getItem("admin")) && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <p
                  style={{
                    color: darkMode ? "#d3d0ca" : "",
                    marginLeft: "10px",
                  }}
                >
                  Priority
                </p>
                <input
                  className={
                    "profile-input number-input" +
                    (darkMode ? " dark-mode" : "")
                  }
                  name="priority"
                  type="number"
                  value={priority}
                  onChange={handleChange}
                  style={{ marginLeft: "15px" }}
                  min={1}
                  max={teamSize}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            {JSON.parse(localStorage.getItem("admin")) && (
              <Button
                variant="contained"
                disableElevation
                onClick={handleDelete}
                sx={{
                  backgroundColor: "#E16464",
                  color: darkMode ? "#31304D" : "#EEEEEE",
                  padding: isMobile ? "5px 10px 3px 8px" : "5px 10px 2px 8px",
                  "&:hover": { backgroundColor: "#964343" },
                  marginRight: "5px",
                  marginBottom: "1vh",
                }}
              >
                <div className="button-content">
                  <DeleteIcon
                    sx={{
                      ...styles.icon,
                      marginTop: "-1px",
                      marginRight: "5px",
                    }}
                  />
                  delete
                </div>
              </Button>
            )}
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={handleSubmit}
              type="submit"
              sx={{
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: isMobile ? "5px 10px 3px 10px" : "5px 10px 2px 10px",
                "&:hover": { backgroundColor: "#098595" },
                marginRight: "15px",
                marginBottom: "1vh",
              }}
            >
              <div className="button-content">
                <SendIcon
                  sx={{ ...styles.icon, marginTop: "-1px", marginRight: "5px" }}
                />
                submit
              </div>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

EditProfileDialog.propTypes = {
  teamSize: PropTypes.number.isRequired,
};
