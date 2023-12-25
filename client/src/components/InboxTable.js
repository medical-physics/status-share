import React from "react";
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
  Box,
} from "@mui/material";

// Redux
import { useSelector } from "react-redux";

function createData(name, subject, timestamp, message) {
  return { name, subject, timestamp, message };
}

export default function InboxTable() {
  const rows = [];
  const mailbox = useSelector((state) => state.mailbox.mailbox);
  const userId = useSelector((state) => state.users.user._id);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  mailbox.forEach((message) => {
    rows.push(
      createData(
        message.senderName,
        message.subject,
        message.timestamp,
        message
      )
    );
  });

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ color: darkMode ? "#d3d0ca" : "" }}>
            <TableCell>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Read</Box>
            </TableCell>
            <TableCell>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Sender</Box>
            </TableCell>
            <TableCell>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Subject</Box>
            </TableCell>
            <TableCell>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Date</Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.message._id}>
              <TableCell>
                <MessageDialog
                  messageId={row.message._id}
                  userId={userId}
                  readStatus={row.message.readStatus}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>
                {dayjs(row.timestamp).format("h:mm a, MMMM DD YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
