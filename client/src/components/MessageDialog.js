import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styles from "../styles/components/MessageDialog.json";

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  DraftsOutlined as DraftsOutlinedIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
  AccountBox as AccountBoxIcon,
  AlternateEmail as AlternateEmailIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  markMessageReadAsync,
  deleteMessageAsync,
  getMessageAsync,
} from "../redux/slices/mailboxSlice";

export default function MessageDialog(props) {
  const [open, setOpen] = React.useState(false);

  const { messageId, userId, readStatus } = props;

  const dispatch = useDispatch();
  const message = useSelector((state) => state.mailbox.message);
  const loading = useSelector((state) => state.UI.loading);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    dispatch(getMessageAsync(messageId));
    setOpen(true);

    if (!readStatus) {
      dispatch(markMessageReadAsync({ messageId, userId }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteMessageAsync({ messageId, userId }));
    handleClose();
  };

  const renderButton = () => {
    if (readStatus) {
      return (
        <IconButton
          onClick={handleOpen}
          style={{ color: "#65b741" }}
          size="small"
        >
          <DraftsOutlinedIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={handleOpen}
          style={{ color: "#65b741" }}
          size="small"
        >
          <MailIcon />
        </IconButton>
      );
    }
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
          {message.subject}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Grid container>
          <Grid item>
            <AccountBoxIcon style={{ color: "#388e3c" }} sx={styles.icon} />
          </Grid>
          <Grid item>
            <Typography sx={styles.text1} noWrap>
              {message.senderName}
            </Typography>
          </Grid>
          <Grid item>
            <AlternateEmailIcon style={{ color: "#388e3c" }} sx={styles.icon} />
          </Grid>
          <Grid item>
            <Typography sx={styles.text1} noWrap>
              {message.senderContact}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="div" sx={styles.text1}>
              <Box fontWeight="fontWeightBold" m={1}>
                Sent at:{" "}
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.text1}>
              {dayjs(message.timestamp).format("h:mm a, MMMM DD YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography component="div" sx={styles.text2}>
              <Box fontWeight="fontWeightBold" m={1}>
                Message:{" "}
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={styles.text2}>{message.message}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          style={{ color: "#ef5350" }}
          variant="outlined"
        >
          <DeleteIcon sx={styles.buttonIcon} />
          delete
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <>
      {renderButton()}
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
            width: isMobile ? "90%" : "500px",
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

MessageDialog.propTypes = {
  messageId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  readStatus: PropTypes.bool.isRequired,
};
