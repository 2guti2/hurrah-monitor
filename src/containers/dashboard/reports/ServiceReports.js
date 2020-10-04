import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../../components/title/Title';
import client from '../../../controllers/HttpClient';
import { useDispatch } from 'react-redux';

export default function ServiceReports({host}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    client.get(`/api/last_status?hostId=${host.id}`)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (
    <React.Fragment>
      <Title>Last service reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status && status['services_status'] && status['services_status'].map((row) => (
            <TableRow key={row.name}>
              <TableCell>{status.timestamp}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row['is_running'] ? 'Running' : 'Down'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}