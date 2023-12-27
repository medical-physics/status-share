import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styles from "../styles/components/MessageDialog.json";
import "../styles/components/message-dialog.css";

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
  TableRow,
  TableCell,
} from "@mui/material";
import {
  DraftsOutlined as DraftsOutlinedIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
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

  const { messageId, userId, readStatus, senderName, timestamp } = props;

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
        <IconButton style={{ color: "#65b741" }} size="small">
          <DraftsOutlinedIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton style={{ color: "#65b741" }} size="small">
          <MailIcon />
        </IconButton>
      );
    }
  };

  const dialogMarkup = loading ? (
    <div>
      <DialogTitle sx={{ color: darkMode ? "#d3d0ca" : "" }}>
        Loading...
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <div className="loading-container">
          <CircularProgress size={45} thickness={5} />
        </div>
      </DialogContent>
    </div>
  ) : (
    <div>
      <DialogTitle>
        <Grid sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}>
          Message
          <IconButton onClick={handleClose} size="small">
            <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <div
          style={{
            color: darkMode ? "#d3d0ca" : "",
            marginTop: "0px",
            marginBottom: "30px",
          }}
        >
          <div>
            <b>From: </b>
            {message.senderName}
          </div>
          <div style={{ marginTop: "15px" }}>
            <b>Sent: </b>
            {dayjs(message.timestamp).format("h:mm a, MMM DD YYYY")}
          </div>
          <div
            className="message-container"
            style={{
              marginTop: "15px",
              color: darkMode ? "#d3d0ca" : "",
              borderColor: darkMode ? "#7A7A7A" : "",
              backgroundColor: darkMode ? "#161b22" : "white",
            }}
          >
            {message.message}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          onClick={handleDelete}
          sx={{
            backgroundColor: "#E16464",
            color: darkMode ? "#31304D" : "#EEEEEE",
            padding: isMobile ? "5px 10px 3px 0px" : "5px 10px 2px 0px",
            "&:hover": { backgroundColor: "#964343" },
            marginRight: "15px",
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
      </DialogActions>
    </div>
  );

  return (
    <>
      <TableRow
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          backgroundColor: readStatus
            ? darkMode
              ? "#2d3138"
              : "#E9E9E9"
            : darkMode
              ? "#425F57"
              : "#D7DFDA",
          borderColor: darkMode ? "#7A7A7A" : "",
          ":hover": {
            backgroundColor: readStatus
              ? darkMode
                ? "#42454B"
                : "#DBDBDB"
              : darkMode
                ? "#546F67"
                : "#C1C8C4",
          },
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell sx={{ borderColor: darkMode ? "#7A7A7A" : "#C0C1C3" }}>
          {renderButton()}
        </TableCell>
        <TableCell
          sx={{
            borderColor: darkMode ? "#7A7A7A" : "#C0C1C3",
            color: darkMode ? "#d3d0ca" : "",
          }}
        >
          {senderName}
        </TableCell>
        <TableCell
          sx={{
            borderColor: darkMode ? "#7A7A7A" : "#C0C1C3",
            color: darkMode ? "#d3d0ca" : "",
          }}
        >
          {isMobile
            ? dayjs(timestamp).format("MMM DD")
            : dayjs(timestamp).format("MMM DD, YYYY")}
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#232D3F" : "",
            border: "1px solid",
            borderRadius: "7px",
            borderColor: darkMode ? "#7A7A7A" : "",
            width: isMobile ? "80%" : "500px",
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
  senderName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};
