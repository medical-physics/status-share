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

// Redux
import { useSelector } from 'react-redux';

function createData (name, subject, timestamp, message) {
  return { name, subject, timestamp, message };
}

export default function InboxTable () {
  const rows = [];
  const mailbox = useSelector((state) => state.mailbox.mailbox);
  const userId = useSelector((state) => state.users.user._id);

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
            <TableRow key={row.message._id}>
              <TableCell>
                <MessageDialog messageId={row.message._id} userId={userId} readStatus={row.message.readStatus} />
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
