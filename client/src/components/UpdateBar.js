import React from "react";
import dayjs from "dayjs";

// MUI components
import {
  AppBar,
  Toolbar,
  Grid,
  Typography
} from "@mui/material";

// Redux
import { useSelector } from "react-redux";

const styles = {
  appBar: {
    top: 42,
    height: 40
  }
};

export default function UpdateBar () {
  const updateTime = useSelector((state) => state.account.updateTime);

  return (
    <AppBar sx={styles.appBar} color='inherit'>
      <Toolbar variant='dense'>
        <Grid justify='flex-start' alignItems='center' container>
          <Grid item>
            <Typography variant='overline'>
              Last updated at: {dayjs(updateTime).format("h:mm:ss a, MMMM DD")}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
