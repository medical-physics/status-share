import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styles from "../styles/components/ProfileDialog.json";

// Components
import ProfileButton from "./ProfileButton";
import EditProfile from "./EditProfile";
import SendMessageDialog from "./SendMessageDialog";
import InboxDialog from "./InboxDialog";

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
  Box
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Group as GroupIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserAsync, deleteUserAsync } from "../redux/slices/usersSlice";

const DEFAULT_DIV = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProfileDialog (props) {
  const [open, setOpen] = React.useState(false);

  const { unreadMessages, userId } = props;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { name, status, statusTime, phone, email, team, memo } = user;
  const loading = useSelector((state) => state.UI.loading);

  const handleOpen = () => {
    dispatch(getUserAsync(userId));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteUserAsync(userId));
    handleClose();
  };

  const dialogMarkup = loading
    ? (
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
    )
    : (
      <div>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {name}
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container justify='flex-start'>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><PhoneIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  {phone || DEFAULT_DIV}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><EmailIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  {email || DEFAULT_DIV}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='center'>
                <Grid item><GroupIcon color='secondary' sx={styles.icon} /></Grid>
                <Grid item>
                  <Typography>{capitalize(String(team))}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography component='div' sx={styles.statusText}>
                <Box fontWeight='fontWeightBold' m={1}>Status: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.statusText} noWrap>{status}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography component='div' sx={styles.text2}>
                <Box fontWeight='fontWeightBold' m={1}>Since: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text2}>{dayjs(statusTime).format("h:mm a, MMMM DD YYYY")}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography component='div' sx={styles.text2}>
                <Box fontWeight='fontWeightBold' m={1}>Memo: </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text2}>{memo}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {JSON.parse(localStorage.getItem("admin")) && (
            <Button onClick={handleDelete} style={{ color: "#ef5350" }} variant='outlined'>
              <DeleteIcon sx={styles.buttonIcon} />delete
            </Button>)}
          {!JSON.parse(localStorage.getItem("viewOnly")) && (<InboxDialog userId={userId} onClose={handleClose} />)}
          <SendMessageDialog userId={userId} onClose={handleClose} />
          {!JSON.parse(localStorage.getItem("viewOnly")) && (<EditProfile onClose={handleClose} />)}
        </DialogActions>
      </div>
    );

  return (
    <>
      <ProfileButton onClick={handleOpen} unreadMessages={unreadMessages} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

ProfileDialog.propTypes = {
  userId: PropTypes.string.isRequired,
  unreadMessages: PropTypes.number.isRequired
};
