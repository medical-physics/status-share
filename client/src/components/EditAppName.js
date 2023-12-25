import React from "react";
import styles from "../styles/components/EditAppName.json";
import "../styles/components/edit-app-name.css";

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
import {
  Send as SendIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setAppNameAsync } from "../redux/slices/accountSlice";

export default function EditAppName() {
  const [open, setOpen] = React.useState(false);
  const [stateAppName, setStateAppName] = React.useState("");

  const dispatch = useDispatch();
  const appName = useSelector((state) => state.account.appName);
  const darkMode = useSelector((state) => state.account.darkMode);

  const handleOpen = () => {
    setStateAppName(appName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setAppNameAsync(stateAppName));
    handleClose();
  };

  const handleChange = (event) => {
    setStateAppName(event.target.value);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        style={{ color: darkMode ? "#d3d0ca" : "" }}
      >
        <EditIcon />
      </IconButton>
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
        <DialogTitle>
          <Grid
            sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}
          >
            Change website name
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{ color: darkMode ? "#d3d0ca" : "" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <input
              className={"status-input" + (darkMode ? " dark-mode" : "")}
              name="appName"
              placeholder={appName}
              type="text"
              value={stateAppName}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={handleSubmit}
              type="submit"
              sx={{
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: "5px 10px 2px 2px",
                "&:hover": { backgroundColor: "#2FA2B9" },
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
