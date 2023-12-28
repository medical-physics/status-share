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
  Button,
} from "@mui/material";
import {
  Group as GroupIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Send as SendIcon,
  EditNote as EditNoteIcon,
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync, editProfileAsync } from "../redux/slices/usersSlice";

export default function ProfileDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [memoDraft, setMemoDraft] = React.useState();

  const { unreadMessages, userId, name, teamSize } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { status, statusTime, phone, email, team, memo } = user;
  const loading = useSelector((state) => state.UI.loading);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  React.useEffect(
    (state) => {
      setMemoDraft(memo);
    },
    [memo]
  );

  const handleOpen = () => {
    dispatch(getUserAsync(userId));
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setMemoDraft(event.target.value);
  };

  const handleSubmitMemo = (event) => {
    event.preventDefault();
    const profileData = {
      userId: user._id,
      ...user,
      memo: memoDraft,
    };
    dispatch(editProfileAsync(profileData));
    setEditMode(false);
  };

  const handleEnterEditMode = (event) => {
    setMemoDraft(memo);
    setEditMode(true);
  };

  const handleExitEditMode = (event) => {
    setEditMode(false);
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
          {!editMode ? (
            <div style={{ marginTop: "15px" }}>
              <b>Memo: </b>
              {memo}
            </div>
          ) : (
            <div className="memo-input-line">
              <textarea
                className={"memo-input" + (darkMode ? " dark-mode" : "")}
                placeholder="Memo"
                type="text"
                value={memoDraft}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {!editMode ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {!JSON.parse(localStorage.getItem("viewOnly")) && (
              <>
                <EditProfileDialog teamSize={teamSize} />
                <div>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleEnterEditMode}
                    type="submit"
                    sx={{
                      backgroundColor: "#B089DA",
                      color: darkMode ? "#31304D" : "#EEEEEE",
                      padding: isMobile
                        ? "5px 5px 3px 5px"
                        : "5px 10px 2px 2px",
                      "&:hover": { backgroundColor: "#755B91" },
                      marginRight: "10px",
                      marginBottom: "1vh",
                    }}
                  >
                    <div className="button-content">
                      <EditNoteIcon
                        sx={{
                          ...styles.icon,
                          marginTop: "-1px",
                          marginRight: "5px",
                          marginLeft: "8px",
                        }}
                      />
                      {isMobile ? "" : "memo"}
                    </div>
                  </Button>
                  <InboxDialog
                    unreadMessages={unreadMessages}
                    userId={userId}
                    onClose={handleClose}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <IconButton
              variant="contained"
              onClick={handleExitEditMode}
              type="submit"
              sx={{
                color: darkMode ? "#d3d0ca" : "",
                padding: isMobile ? "5px 5px 3px 2px" : "5px 5px 2px 2px",
                "&:hover": { backgroundColor: "transparent" },
                marginLeft: "15px",
                marginBottom: "1vh",
              }}
            >
              <KeyboardBackspaceIcon
                sx={{
                  ...styles.icon,
                  marginTop: "-1px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              />
            </IconButton>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSubmitMemo}
              type="submit"
              sx={{
                backgroundColor: "#B089DA",
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: isMobile ? "5px 10px 3px 2px" : "5px 10px 2px 2px",
                "&:hover": { backgroundColor: "#755B91" },
                marginRight: "15px",
                marginBottom: "1vh",
              }}
            >
              <div className="button-content">
                <SendIcon
                  sx={{
                    ...styles.icon,
                    marginTop: "-1px",
                    marginRight: "5px",
                    marginLeft: "8px",
                  }}
                />
                submit
              </div>
            </Button>
          </div>
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
        memo={props.memo}
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
  teamSize: PropTypes.number.isRequired,
  memo: PropTypes.string.isRequired,
};
