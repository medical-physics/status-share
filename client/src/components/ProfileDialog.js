import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styles from "../styles/components/ProfileDialog.json";
import "../styles/components/profile-dialog.css";

// Components
import ProfileButton from "./ProfileButton";
import EditProfileDialog from "./EditProfileDialog";
import InboxDialog from "./InboxDialog";

// MUI components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  Group as GroupIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync } from "../redux/slices/usersSlice";

const DEFAULT_DIV = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProfileDialog(props) {
  const [open, setOpen] = React.useState(false);

  const { unreadMessages, userId, name } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { status, statusTime, phone, email, team, memo } = user;
  const loading = useSelector((state) => state.UI.loading);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    dispatch(getUserAsync(userId));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Grid sx={styles.spinnerGrid}>
          <div>
            <CircularProgress size={80} thickness={3} />
          </div>
        </Grid>
      </DialogContent>
    </div>
  ) : (
    <div>
      <DialogTitle>
        <Grid sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}>
          {name}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ ...styles.dialogContent }}>
        <div style={{ color: darkMode ? "#d3d0ca" : "" }}>
          {phone && (
            <div className="contact-line" style={{ marginBottom: "7px" }}>
              <PhoneIcon
                color="secondary"
                sx={{ ...styles.icon, marginTop: 0 }}
              />
              {phone}
            </div>
          )}
          {email && (
            <div className="contact-line" style={{ marginBottom: "7px" }}>
              <EmailIcon
                color="secondary"
                sx={{ ...styles.icon, marginTop: 0 }}
              />
              {email}
            </div>
          )}
          {team && (
            <div className="contact-line">
              <GroupIcon
                color="secondary"
                sx={{ ...styles.icon, marginTop: 0 }}
              />
              {team}
            </div>
          )}
        </div>
        <div style={{ color: darkMode ? "#d3d0ca" : "", marginTop: "30px" }}>
          <div style={{ marginTop: "15px" }}>
            <b>Status: </b>
            {status}
          </div>
          <div style={{ marginTop: "15px" }}>
            <b>Since: </b>
            {isMobile
              ? dayjs(statusTime).format("h:mm a, MMM DD")
              : dayjs(statusTime).format("h:mm a, MMM DD YYYY")}
          </div>
          <div style={{ marginTop: "15px" }}>
            <b>Memo: </b>
            {memo}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        {!JSON.parse(localStorage.getItem("viewOnly")) && (
          <EditProfileDialog onClose={handleClose} />
        )}
        {!JSON.parse(localStorage.getItem("viewOnly")) && (
          <InboxDialog userId={userId} onClose={handleClose} />
        )}
      </DialogActions>
    </div>
  );

  return (
    <>
      <ProfileButton
        onClick={handleOpen}
        unreadMessages={unreadMessages}
        name={name}
      />
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
        {dialogMarkup}
      </Dialog>
    </>
  );
}

ProfileDialog.propTypes = {
  userId: PropTypes.string.isRequired,
  unreadMessages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
