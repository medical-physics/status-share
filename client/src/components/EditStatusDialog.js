import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/edit-status-dialog.json";
import "../styles/components/edit-status-dialog.css";

// MUI components
import {
  Box,
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, updateStatusAsync } from "../redux/slices/usersSlice";

const DEFAULT_STATUS = <>&nbsp;&nbsp;&nbsp;</>;

export default function EditStatusDialog(props) {
  const [statusState, setStatusState] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { userId, status } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.UI.loading);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const mapUserDetailsToState = (focusedUser) => {
    setStatusState(checkUser(focusedUser));
  };

  const checkUser = (focusedUser) => {
    if (userId === focusedUser._id) {
      return focusedUser.status;
    }
  };

  const handleOpen = () => {
    if (!JSON.parse(localStorage.getItem("viewOnly"))) {
      setOpen(true);
      dispatch(getUserAsync(userId)).then((res) => {
        mapUserDetailsToState(res.payload);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const statusData = {
      status: statusState,
      statusTime: new Date().toString(),
      userId,
    };
    dispatch(updateStatusAsync({ userId, statusData }));
    handleClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const statusData = {
      status: "",
      statusTime: new Date().toString(),
      userId,
    };
    dispatch(updateStatusAsync({ userId, statusData }));
    handleClose();
  };

  const handleChange = (event) => {
    setStatusState(event.target.value);
  };

  const dialogMarkup = loading ? (
    <>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Grid sx={styles.spinnerGrid}>
          <div style={styles.spinnerDiv}>
            <CircularProgress size={50} thickness={3} />
          </div>
        </Grid>
      </DialogContent>
    </>
  ) : (
    <>
      <DialogTitle>
        <Grid sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}>
          {`Edit ${user.name}'s status`}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <form>
        <DialogContent sx={styles.dialogContent}>
          <input
            className={"status-input" + (darkMode ? " dark-mode" : "")}
            placeholder="Status"
            type="text"
            value={statusState}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disableElevation
            onClick={handleDelete}
            sx={{
              backgroundColor: "#E16464",
              color: darkMode ? "#31304D" : "#EEEEEE",
              padding: isMobile ? "5px 10px 3px 2px" : "5px 10px 2px 2px",
              "&:hover": { backgroundColor: "#964343" },
              marginRight: "5px",
              marginBottom: "1vh",
            }}
          >
            <div className="button-content">
              <DeleteIcon
                sx={{ ...styles.icon, marginTop: "-1px", marginRight: "5px" }}
              />
              clear
            </div>
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleSubmit}
            type="submit"
            sx={{
              color: darkMode ? "#31304D" : "#EEEEEE",
              padding: isMobile ? "5px 10px 3px 2px" : "5px 10px 2px 2px",
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
    </>
  );

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          ...styles.statusBox,
          borderColor: darkMode ? "#1e4173" : "#c4def6",
        }}
      >
        <div style={{ ...styles.statusText, color: darkMode ? "#d3d0ca" : "" }}>
          {status || DEFAULT_STATUS}
        </div>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#232D3F" : "",
            border: "1px solid",
            borderRadius: "7px",
            borderColor: darkMode ? "#7A7A7A" : "",
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
        {dialogMarkup}
      </Dialog>
    </>
  );
}

EditStatusDialog.propTypes = {
  userId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
