import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/InboxDialog.json";

// Components
import InboxTable from "./InboxTable";

// MUI components
import {
  Grid,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Mail as MailIcon } from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getMailboxAsync } from "../redux/slices/mailboxSlice";

export default function InboxDialog(props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { name } = user;
  const loading = useSelector((state) => state.mailbox.loadingMailbox);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    dispatch(getMailboxAsync(props.userId));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const dialogMarkup = loading ? (
    <div>
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <div style={styles.spinnerDiv}>
          <CircularProgress size={80} thickness={2} />
        </div>
      </DialogContent>
    </div>
  ) : (
    <div>
      <DialogTitle>
        <Grid sx={styles.dialogTitle}>
          {`Inbox: ${name}`}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <InboxTable />
      </DialogContent>
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={handleOpen}
        type="submit"
        sx={{
          backgroundColor: "#A3B763",
          color: darkMode ? "#31304D" : "#EEEEEE",
          padding: isMobile ? "5px 10px 3px 7px" : "5px 10px 2px 7px",
          "&:hover": { backgroundColor: "#79AC78" },
          marginRight: "15px",
          marginBottom: "1vh",
        }}
      >
        <div className="button-content">
          <MailIcon
            sx={{
              ...styles.icon,
              marginTop: isMobile ? "-1px" : "-2px",
              marginRight: "5px",
            }}
          />
          inbox
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {dialogMarkup}
      </Dialog>
    </>
  );
}

InboxDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
