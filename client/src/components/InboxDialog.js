import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/inbox-dialog.json";
import "../styles/components/inbox-dialog.css";

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
import {
  Close as CloseIcon,
  Mail as MailIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getMailboxAsync } from "../redux/slices/mailboxSlice";

const DEFAULT_PAGE_SIZE = 10;

export default function InboxDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.mailbox.loadingMailbox);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);
  const hasMail = useSelector((state) => state.mailbox.mailboxCount > 0);

  const { unreadMessages, userId } = props;

  const handleOpen = () => {
    dispatch(getMailboxAsync({ userId, page, pageSize }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    dispatch(getMailboxAsync({ userId, page: newPage, pageSize }));
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(0);
    dispatch(
      getMailboxAsync({ userId, page: 0, pageSize: event.target.value })
    );
  };

  const dialogMarkup = loading ? (
    <div>
      <DialogTitle sx={{ color: darkMode ? "#d3d0ca" : "" }}>
        Loading...
      </DialogTitle>
      <DialogContent sx={{ ...styles.dialogContent, height: 450 }}>
        <div className="loading-container">
          <CircularProgress size={45} thickness={5} />
        </div>
      </DialogContent>
    </div>
  ) : (
    <div>
      <DialogTitle>
        <Grid sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}>
          {`Inbox: ${user.name}`}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent
        sx={{
          ...styles.dialogContent,
          height: hasMail ? 450 : 300,
          alignItems: hasMail ? "" : "center",
        }}
      >
        {hasMail ? (
          <InboxTable
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        ) : (
          <p
            className="empty-inbox-text"
            style={{ color: darkMode ? "#d3d0ca" : "" }}
          >
            Inbox is empty
          </p>
        )}
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
          backgroundColor: "#65b741",
          color: darkMode ? "#31304D" : "#EEEEEE",
          padding: isMobile ? "5px 10px 3px 10px" : "5px 10px 2px 10px",
          "&:hover": { backgroundColor: "#3C6D27" },
          marginRight: "15px",
          marginBottom: "1vh",
        }}
      >
        <div className="button-content">
          {unreadMessages > 0 ? (
            <MarkEmailUnreadIcon
              sx={{
                ...styles.icon,
                marginTop: isMobile ? "-1px" : "-2px",
                marginRight: "5px",
              }}
            />
          ) : (
            <MailIcon
              sx={{
                ...styles.icon,
                marginTop: isMobile ? "-1px" : "-2px",
                marginRight: "5px",
              }}
            />
          )}
          inbox
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: darkMode ? "#232D3F" : "",
            border: "1px solid",
            borderRadius: "7px",
            borderColor: darkMode ? "#7A7A7A" : "",
            width: isMobile ? "90%" : "750px",
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

InboxDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  unreadMessages: PropTypes.number.isRequired,
};
