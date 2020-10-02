import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from 'components/title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceReports, selectReports } from './reportsSlice';

export default function ServiceReports({host}) {
  const dispatch = useDispatch();
  const {reports} = useSelector(selectReports);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    dispatch(getServiceReports(host.id));
  }, [dispatch, host.id]);

  useEffect(() => {
    const reportForThisHost = reports.find(l => l.hostId === host.id);
    if (reportForThisHost)
      setStatus(reportForThisHost);
  }, [reports, host.id]);

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
