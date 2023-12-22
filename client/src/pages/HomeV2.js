import React from "react";
import { Helmet } from "react-helmet";
import { authenticate } from "../util/Authenticator";
import styles from "../styles/pages/Home.json";
import "../styles/pages/home.css";

// Components
import NavBar from "../components/NavBarV2";
import UpdateBar from "../components/UpdateBar";
import TeamTable from "../components/TeamTable";
import LoadingTable from "../components/LoadingTable";
import SocketWrapper from "../util/stream/SocketWrapper";

// MUI Components
import {
  Grid,
  Box,
  Dialog,
  DialogTitle,
  Typography,
  CircularProgress
} from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAppNameAsync } from "../redux/slices/accountSlice";
import { getUsersAsync } from "../redux/slices/usersSlice";
import { getTeamsAsync } from "../redux/slices/teamsSlice";
import { selectIsAccessTokenValid, selectTeamDetailsMap, selectTeamMembersMap } from "../redux/selectors/selectors";

const LOADING_TABLES_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Home () {
  const dispatch = useDispatch();

  const teams = useSelector((state) => state.teams.teams);
  const appName = useSelector((state) => state.account.appName);
  const loadingUsersData = useSelector((state) => state.users.loadingUsersData);
  const loadingTeamsData = useSelector((state) => state.teams.loadingTeamsData);
  const checkingAuth = useSelector((state) => state.account.checkingAuth);
  const loadingUser = useSelector((state) => state.UI.loadingUser);
  const loadingTeam = useSelector((state) => state.UI.loadingTeam);
  const teamDetailsMap = useSelector((state) => selectTeamDetailsMap(state));
  const teamMembersMap = useSelector((state) => selectTeamMembersMap(state));
  const isTokenValid = useSelector((state) => selectIsAccessTokenValid(state));

  const [showLoadingTables, setShowLoadingTables] = React.useState(true);

  React.useEffect(() => {
    authenticate();
  }, []);

  React.useEffect(() => {
    try {
      if (isTokenValid) {
        dispatch(getAppNameAsync());
        dispatch(getTeamsAsync());
        dispatch(getUsersAsync());
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, isTokenValid]);

  React.useEffect(() => {
    if (!loadingUsersData && !loadingTeamsData && !checkingAuth) {
      setShowLoadingTables(false);
    } else {
      setShowLoadingTables(true);
    }
  }, [loadingUsersData, loadingTeamsData, checkingAuth]);

  return (
    <SocketWrapper>
      <div className="page-container">
        <NavBar />
      </div>
    </SocketWrapper>
  );
}
