import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HostLoad from './loads/HostLoad';
import ServiceReports from './reports/ServiceReports';
import Title from 'components/title/Title';
import { Divider } from '@material-ui/core';
import { getHosts, selectHosts } from './hostsSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const {hosts} = useSelector(selectHosts);

  useEffect(() => {
    dispatch(getHosts(undefined));
  }, [dispatch]);

  return (
    <div>
      {hosts && hosts.length && hosts.map((host, index) =>
        <div key={host.id}>
          <Container maxWidth="lg" className={classes.container}>
            <Title>Host {host.name}</Title>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <HostLoad host={host}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ServiceReports host={host}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          {index !== hosts.length - 1 && <Divider/>}
        </div>
      )}
    </div>
  );
}
