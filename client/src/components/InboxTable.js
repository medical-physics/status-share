import React from "react";

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
    <TableContainer
      className="dark-scrollbar"
      sx={{
        border: "1px solid",
        borderColor: darkMode ? "#7A7A7A" : "",
        borderRadius: "7px"
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              color: darkMode ? "#d3d0ca" : "",
              backgroundColor: darkMode ? "#181F2C" : "#D3D3D3",
            }}
          >
            <TableCell sx={{ borderColor: darkMode ? "#7A7A7A" : "black" }}>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Read</Box>
            </TableCell>
            <TableCell sx={{ borderColor: darkMode ? "#7A7A7A" : "black" }}>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>From</Box>
            </TableCell>
            <TableCell sx={{ borderColor: darkMode ? "#7A7A7A" : "black" }}>
              <Box sx={{ color: darkMode ? "#d3d0ca" : "" }}>Date</Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <MessageDialog
              key={row.message._id}
              messageId={row.message._id}
              userId={userId}
              readStatus={row.message.readStatus}
              senderName={row.name}
              timestamp={row.timestamp}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
