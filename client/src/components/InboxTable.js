import React from 'react';
import dayjs from 'dayjs';

// Components
import MessageDialog from './MessageDialog';

// MUI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';

// Redux stuff
import { useSelector } from 'react-redux';

function createData (name, subject, timestamp, message) {
  return { name, subject, timestamp, message };
}

export default function InboxTable () {
  const rows = [];
  const mailbox = useSelector((state) => state.mailbox.mailbox);

  mailbox.forEach((message) => { rows.push(createData(message.senderName, message.subject, message.timestamp, message)); });

  return (
    <TableContainer>
      <Table size='small'>
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
                {dayjs(row.timestamp).format('h:mm a, MMMM DD YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
