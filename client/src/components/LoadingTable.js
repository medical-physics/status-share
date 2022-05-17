import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// MUI components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Toolbar from "@material-ui/core/Toolbar";

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    statusCell: {
        width: 180,
        flexWrap: "wrap",
        fontSize: 12
    },
    //style for font size
    resize: {
        fontSize: 12
    },
    tableCell: {
        width: 140,
        fontSize: 13
    },
    tableCell2: {
        width: 15
    },
    checkbox: {
        width: 10,
        height: 10
    },
    box: {
        maxWidth: 110
    },
    status: {
        maxWidth: 150
    }
};

export class LoadingTable extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper elevation={3}>
                    <Toolbar>
                        <Typography>
                            <Box fontWeight="fontWeightBold" m={1}>
                                Loading Team
                            </Box>
                        </Typography>
                    </Toolbar>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Present</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item >
                                                <IconButton size="small">
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item className={classes.box}>
                                                Loading...
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small">
                                            <RadioButtonUncheckedIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.statusCell}>
                                        <Grid container alignItems="center" justify="space-between" spacing={1}>
                                            <Grid item className={classes.status}>
                                                Loading...
                                            </Grid>
                                            <Grid item >
                                                {!Boolean(parseInt(localStorage.viewOnly)) && (
                                                    <IconButton size="small">
                                                        <EditIcon />
                                                    </IconButton>)}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        )
    };
}

export default withStyles(styles)(LoadingTable);
