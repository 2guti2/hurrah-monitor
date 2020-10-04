import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../../controllers/HttpClient'
import {loads} from '../../../store/actionNames';

const queryApiForHostLoad = (hostId) => {
  return new Promise(resolve => {
    client.get(`/api/hosts/${hostId}/load`).then(res => resolve({hostId, loads: res.data}));
  });
};

export const getHostLoad = createAsyncThunk(
  loads.actions.get,
  async (hostId) => {
    return await queryApiForHostLoad(hostId);
  }
);

export const hostLoadSlice = createSlice({
  name: loads.name,
  initialState: {
    loads: []
  },
  reducers: {},
  extraReducers: {
    [getHostLoad.fulfilled]: (state, action) => {
      state.loads.push(action.payload);
    }
  }
});

export const selectLoads = state => state.loads;

export default hostLoadSlice.reducer;
