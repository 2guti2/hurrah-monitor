import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from 'components/title/Title';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getHostLoad, selectLoads } from './loadSlice';

export default function HostLoad({ host }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {loads} = useSelector(selectLoads);

  useEffect(() => {
    dispatch(getHostLoad(host.id));
  }, [dispatch, host.id]);

  useEffect(() => {
    const loadForThisHost = loads.find(l => l.hostId === host.id);
    if (loadForThisHost)
      setData(loadForThisHost.loads);
  }, [loads, host.id]);

  return (
    <React.Fragment>
      <Title>Load</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="timestamp" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Load (%)
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Line type="monotone" dataKey="CPU" stroke="#8884d8" />
          <Line type="monotone" dataKey="RAM" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
