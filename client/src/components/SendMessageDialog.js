import React from "react";
import styles from "../styles/components/send-message-dialog.json";
import "../styles/components/send-message-dialog.css";
import { selectUsersSortedByName } from "../util/Selectors";

// MUI components
import {
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  ForwardToInbox as ForwardToInboxIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addMessageAsync } from "../redux/slices/mailboxSlice";

export default function SendMessageDialog() {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    senderName: "",
    senderContact: "",
    subject: "",
    message: "",
  });
  const [recipient, setRecipient] = React.useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => selectUsersSortedByName(state));
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const { senderName, senderContact, subject, message } = formValue;

  React.useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (recipient && formValue.message) {
          handleSubmit(event);
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [formValue, recipient]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValue({
      senderName: "",
      senderContact: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessageData = {
      senderName: senderName.trim(),
      senderContact: senderContact.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    dispatch(
      addMessageAsync({
        newMessageData,
        userId: recipient,
      })
    );
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

  const handleRecipientSelection = (event) => {
    setRecipient(event.target.value);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        disableElevation
        sx={{
          backgroundColor: "#65b741",
          color: darkMode ? "#31304D" : "#EEEEEE",
          "&:hover": { backgroundColor: "#3C6D27" },
          marginRight: "15px",
        }}
      >
        <ForwardToInboxIcon sx={styles.buttonIcon} />
      </Button>
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
        <DialogTitle>
          <Grid
            sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}
          >
            Send message
            <IconButton onClick={handleClose} size="small">
              <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <div
              className="to-line"
              style={{ color: darkMode ? "#d3d0ca" : "" }}
            >
              To:
              <FormControl
                sx={{
                  m: 1,
                  minWidth: isMobile ? "70%" : "218px",
                  marginLeft: isMobile ? "" : "44px",
                }}
              >
                <InputLabel
                  style={{
                    color: darkMode ? "#82858a" : "#afafaf",
                    fontSize: "15px",
                    marginTop: isMobile ? "" : "3px",
                  }}
                >
                  Recipient
                </InputLabel>
                <Select
                  value={recipient}
                  onChange={handleRecipientSelection}
                  label="Recipient"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: "6px",
                        maxHeight: "40vh",
                        backgroundColor: darkMode ? "#0D1117" : "",
                      },
                    },
                  }}
                  sx={{
                    color: darkMode ? "#d3d0ca" : "",
                    "&.MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#7A7A7A",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: darkMode ? "#7A7A7A" : "",
                    },
                  }}
                >
                  {users.map((user) => (
                    <MenuItem
                      key={user._id}
                      value={user._id}
                      sx={{
                        color: darkMode ? "#d3d0ca" : "",
                        marginRight: "10px",
                      }}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              className="from-line"
              style={{ color: darkMode ? "#d3d0ca" : "" }}
            >
              From:
              <input
                className={"from-input" + (darkMode ? " dark-mode" : "")}
                placeholder="Sender"
                name="senderName"
                type="text"
                value={senderName}
                onChange={handleChange}
                style={{
                  marginLeft: isMobile ? "" : "24px",
                  color: darkMode ? "#d3d0ca" : "",
                  width: isMobile ? "65%" : "205px",
                }}
              />
            </div>
            <TextField
              id="message"
              name="message"
              type="text"
              label="Message"
              variant="filled"
              multiline
              rows="4"
              value={message}
              onChange={handleChange}
              fullWidth
              InputProps={{
                sx: {
                  color: darkMode ? "#d3d0ca" : "",
                },
              }}
              sx={{
                marginTop: "25px",
                borderRadius: "5px",
                backgroundColor: darkMode ? "#21262D" : "",
                "& .MuiFormLabel-root": {
                  color: darkMode ? "#7A7A7A" : "",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSubmit}
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#65b741",
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: isMobile ? "5px 10px 3px 2px" : "5px 10px 2px 2px",
                "&:hover": { backgroundColor: "#3C6D27" },
                marginRight: "15px",
                marginBottom: "1vh",
              }}
            >
              <div className="button-content">
                <SendIcon
                  sx={{ ...styles.icon, marginTop: "-1px", marginRight: "5px" }}
                />
                send
              </div>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
