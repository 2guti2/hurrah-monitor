import client from '../../../controllers/HttpClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {reports} from '../../../store/actionNames';

const queryApiForServiceReports = (hostId) => {
  return new Promise(resolve => {
    client.get(`/api/last_status?hostId=${hostId}`).then(res => resolve({hostId, ...res.data}));
  });
};

export const getServiceReports = createAsyncThunk(
  reports.actions.get,
  async (hostId) => {
    return await queryApiForServiceReports(hostId);
  }
);

export const serviceReportsSlice = createSlice({
  name: reports.name,
  initialState: {
    reports: []
  },
  reducers: {},
  extraReducers: {
    [getServiceReports.fulfilled]: (state, action) => {
      state.reports.push(action.payload);
    }
  }
});

export const selectReports = state => state.reports;

export default serviceReportsSlice.reducer;
