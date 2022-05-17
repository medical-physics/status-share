import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// MUI components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Redux stuff
import { connect } from "react-redux";

const styles = {
    appBar: {
        top: 42,
        height: 40
    }
};

export class UpdateBar extends Component {

    render() {
        const { classes, updateTime } = this.props;
        return (
            <AppBar className={classes.appBar} color="inherit">
                <Toolbar variant="dense">
                    <Grid justify="flex-start" alignItems="center" container>
                        <Grid item>
                            <Typography variant="overline">
                                Last updated at: {dayjs(updateTime).format("h:mm:ss a, MMMM DD")}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    };
}

const mapStateToProps = (state) => ({
    updateTime: state.account.updateTime
});

UpdateBar.propTypes = {
    updateTime: PropTypes.instanceOf(Date)
};

export default connect(mapStateToProps)(withStyles(styles)(UpdateBar));
