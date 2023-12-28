import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/add-user-dialog.json";
import "../styles/components/add-user-dialog.css";

// MUI components
import {
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../redux/slices/usersSlice";

export default function AddUserDialog(props) {
  const { teamName, teamId, teamSize } = props;

  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    userName: "",
    email: "",
    phone: "",
    team: "",
    teamId: "",
    priority: teamSize + 1,
  });
  const { userName, email, phone, team, priority } = formValue;

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    setOpen(true);
    setFormValue((prevState) => {
      return {
        ...prevState,
        team: teamName,
        teamId: teamId,
        priority: teamSize + 1,
      };
    });
  };

  const revertState = () => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        userName: "",
        email: "",
        phone: "",
        priority: teamSize + 1,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
    revertState();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      name: userName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      team: team.trim(),
      teamId: teamId.trim(),
      priority: priority,
    };
    dispatch(addUserAsync(newUserData));
    handleClose();
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

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{ color: darkMode ? "#d3d0ca" : "" }}
        size="small"
      >
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
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
            {`Add new user to ${teamName}`}
            <IconButton onClick={handleClose} size="small">
              <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <input
              className={
                "user-input text-input" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Name*"
              name="userName"
              type="text"
              value={userName}
              onChange={handleChange}
            />
            <input
              className={
                "user-input text-input" + (darkMode ? " dark-mode" : "")
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
                "user-input text-input" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Phone"
              name="phone"
              type="text"
              value={phone}
              onChange={handleChange}
              style={{ marginTop: "15px" }}
            />
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <p
                style={{ color: darkMode ? "#d3d0ca" : "", marginLeft: "10px" }}
              >
                Priority
              </p>
              <input
                className={
                  "user-input number-input" + (darkMode ? " dark-mode" : "")
                }
                name="priority"
                type="number"
                value={priority}
                onChange={handleChange}
                style={{ marginLeft: "15px" }}
                min={1}
                max={teamSize + 1}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disableElevation
              type="submit"
              sx={{
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: isMobile ? "6px 10px 3px 4px" : "6px 10px 2px 4px",
                "&:hover": { backgroundColor: "#098595" },
                marginRight: "15px",
                marginBottom: "1vh",
              }}
            >
              <AddIcon
                sx={{
                  ...styles.icon,
                  marginTop: isMobile ? "0px" : "-2px",
                  marginRight: "3px",
                }}
              />
              create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

AddUserDialog.propTypes = {
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  teamSize: PropTypes.number.isRequired,
};
