import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Components
import MessageDialog from "./MessageDialog";

// MUI components
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box
} from "@mui/material";

// Redux stuff
import { connect } from "react-redux";

function createData(name, subject, timestamp, message) {
    return { name, subject, timestamp, message };
};

export class InboxTable extends Component {

    render() {
        const rows = [];
        const { mailbox } = this.props;

        mailbox.forEach((message) => { rows.push(createData(message.senderName, message.subject, message.timestamp, message)) });

        return (
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><Box>Read</Box></TableCell>
                            <TableCell><Box>Sender</Box></TableCell>
                            <TableCell><Box>Subject</Box></TableCell>
                            <TableCell><Box>Date</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.message.messageId}>
                                <TableCell>
                                    <MessageDialog messageId={row.message.messageId} userId={row.message.userId} readStatus={row.message.readStatus} />
                                </TableCell>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.subject}
                                </TableCell>
                                <TableCell>
                                    {dayjs(row.timestamp).format("h:mm a, MMMM DD YYYY")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    mailbox: state.mailbox.mailbox
});

InboxTable.propTypes = {
    mailbox: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(InboxTable);
