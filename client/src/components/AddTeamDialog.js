import React from "react";
import { GithubPicker } from "react-color";
import styles from "../styles/components/add-team-dialog.json";
import "../styles/components/add-team-dialog.css";

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
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addTeamAsync } from "../redux/slices/teamsSlice";

export default function AddTeamDialog() {
  const darkMode = useSelector((state) => state.account.darkMode);
  const teamCount = useSelector((state) => state.teams.teams?.length);

  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    team: "",
    priority: teamCount + 1,
    color: "#1a237e",
    col1: "Name",
    col2: "Present",
    col3: "Status",
    checkInCol: false,
    hyperlink: "",
  });

  const { team, priority, color, col1, col2, col3, checkInCol, hyperlink } =
    formValue;

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setFormValue((prevState) => {
      return {
        ...prevState,
        priority: teamCount + 1,
      };
    });
  };

  const handleClose = () => {
    setFormValue({
      team: "",
      priority: teamCount + 1,
      color: "",
      col1: "Name",
      col2: "Present",
      col3: "Status",
      checkInCol: false,
      hyperlink: "",
    });
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeamData = {
      team: team.trim(),
      priority: priority,
      color: color.trim(),
      col1: col1.trim(),
      col2: col2.trim(),
      col3: col3.trim(),
      checkInCol,
      hyperlink: validateHyperLink(hyperlink.trim()),
    };
    dispatch(addTeamAsync(newTeamData));
    handleClose();
  };

  const validateHyperLink = (hyperlink) => {
    if (hyperlink && !hyperlink.startsWith("http")) {
      return "http://" + hyperlink;
    }
    return hyperlink;
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

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        style={{ color: darkMode ? "#d3d0ca" : "" }}
      >
        <AddIcon />
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
        <DialogTitle>
          <Grid
            sx={{ ...styles.dialogTitle, color: darkMode ? "#d3d0ca" : "" }}
          >
            Add new team
            <IconButton
              onClick={handleClose}
              sx={{ ...styles.closeButton, color: darkMode ? "#d3d0ca" : "" }}
              size="small"
            >
              <CloseIcon />
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
                placeholder="Team name*"
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
                  style={{ marginLeft: "15px", minWidth: "40%" }}
                  min={1}
                  max={teamCount + 1}
                />
              </div>
            </div>
            <div className="color-picker">
              <GithubPicker color={color} onChange={handleColorChange} />
            </div>
            <div
              style={{ marginTop: "17px", color: darkMode ? "#d3d0ca" : "" }}
            >
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
              className={
                "team-input full-size" + (darkMode ? " dark-mode" : "")
              }
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
              color="primary"
              onClick={handleSubmit}
              type="submit"
              sx={{
                color: darkMode ? "#31304D" : "#EEEEEE",
                padding: "5px 10px 2px 5px",
                "&:hover": { backgroundColor: "#098595" },
                marginRight: "15px",
                marginBottom: "1vh",
              }}
            >
              <div className="button-content">
                <AddIcon
                  sx={{ ...styles.icon, marginTop: "-2px", marginRight: "5px" }}
                />
                create
              </div>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
