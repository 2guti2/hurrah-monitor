import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HostLoad from './HostLoad';
import ServiceReports from './ServiceReports';
import Title from './Title';
import { Divider } from '@material-ui/core';
import client from '../../controllers/HttpClient';

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      client.get(`/api/hosts`)
        .then(res => {
          setHosts(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, 500);
  }, []);

  return (
    <div>
      {hosts.map((host, index) =>
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
