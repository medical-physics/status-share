import React from "react";
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";
import styles from "../styles/components/EditTeamDialog.json";
import "../styles/components/edit-team-dialog.css";

// MUI components
import {
  Checkbox,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateTeamAsync, deleteTeamAsync } from "../redux/slices/teamsSlice";

export default function EditTeamDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    team: "",
    priority: "",
    color: "",
    col1: "Name",
    col2: "Present",
    col3: "Status",
    checkInCol: false,
    hyperlink: "",
  });

  const { teamDetails, teamSize } = props;
  const { team, priority, color, col1, col2, col3, checkInCol, hyperlink } =
    formValue;

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      team: teamDetails.team,
      priority: teamDetails.priority.toString(),
      color: teamDetails.color,
      col1: teamDetails.col1,
      col2: teamDetails.col2,
      col3: teamDetails.col3,
      checkInCol: teamDetails.checkInCol,
      hyperlink: teamDetails.hyperlink,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const teamData = {
      ...formValue,
      hyperlink: validateHyperLink(hyperlink.trim()),
      prevTeam: teamDetails.team,
      priority: parseInt(priority),
    };
    dispatch(updateTeamAsync({ teamId: teamDetails._id, teamData }));
    handleClose();
  };

  const validateHyperLink = (hyperlink) => {
    if (hyperlink && !hyperlink.startsWith("http")) {
      return "http://" + hyperlink;
    }
    return hyperlink;
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteTeamAsync(teamDetails._id));
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

  const handleColorChange = (color) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        color: color.hex,
      };
    });
  };

  const handleCheckChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        checkInCol: event.target.checked,
      };
    });
  };

  const dialogMarkup = (
    <>
      <DialogTitle>
        <Grid sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}>
          {`Edit team ${teamDetails.team}`}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon sx={{ color: darkMode ? "#d3d0ca" : "" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <form>
        <DialogContent sx={styles.dialogContent}>
          <div className="name-line">
            <input
              className={
                "team-input half-size" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Team name"
              name="team"
              type="text"
              value={team}
              onChange={handleChange}
            />
            <div className="priority-container">
              <p
                style={{
                  color: darkMode ? "#d3d0ca" : "",
                  marginLeft: "14px",
                }}
              >
                Priority
              </p>
              <input
                className={
                  "user-input number-input" + (darkMode ? " dark-mode" : "")
                }
                name="priority"
                type="number"
                value={priority}
                onChange={handleChange}
                style={{
                  marginLeft: isMobile ? "5px" : "15px",
                  minWidth: isMobile ? "46%" : "40%",
                }}
                min={1}
                max={teamSize}
              />
            </div>
          </div>
          <div className="color-picker">
            <GithubPicker color={color} onChange={handleColorChange} />
          </div>
          <div style={{ marginTop: "17px", color: darkMode ? "#d3d0ca" : "" }}>
            Column headers
          </div>
          <div className="col-name-line">
            <input
              className={
                "team-input quarter-size" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Col 1"
              name="col1"
              type="text"
              value={col1}
              onChange={handleChange}
            />
            <input
              className={
                "team-input quarter-size" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Col 2"
              name="col2"
              type="text"
              value={col2}
              onChange={handleChange}
            />
            <input
              className={
                "team-input quarter-size" + (darkMode ? " dark-mode" : "")
              }
              placeholder="Col 3"
              name="col3"
              type="text"
              value={col3}
              onChange={handleChange}
            />
          </div>
          <div className={"check-in-line" + (darkMode ? " dark-mode" : "")}>
            Check-in column
            <Checkbox
              id="checkInCol"
              name="checkInCol"
              checked={checkInCol}
              onChange={handleCheckChange}
              sx={{
                color: darkMode ? "#7A7A7A" : "#0D1117",
              }}
            />
          </div>
          <input
            className={"team-input full-size" + (darkMode ? " dark-mode" : "")}
            placeholder="URL"
            name="hyperlink"
            type="text"
            value={hyperlink}
            onChange={handleChange}
            style={{ marginTop: "15px" }}
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
              padding: isMobile ? "5px 10px 3px 1px" : "5px 10px 2px 1px",
              "&:hover": { backgroundColor: "#964343" },
              marginRight: "5px",
              marginBottom: "1vh",
            }}
          >
            <div className="button-content">
              <DeleteIcon
                sx={{ ...styles.icon, margin: "-2px 5px auto 5px" }}
              />
              delete
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
              <SendIcon sx={{ ...styles.icon, margin: "-1px 5px auto 10px" }} />
              submit
            </div>
          </Button>
        </DialogActions>
      </form>
    </>
  );

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{ color: darkMode ? "#d3d0ca" : "" }}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
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

EditTeamDialog.propTypes = {
  teamDetails: PropTypes.object.isRequired,
  teamSize: PropTypes.number.isRequired,
};
