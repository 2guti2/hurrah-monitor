import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../controllers/HttpClient'

const queryApiForHosts = () => {
  return new Promise(resolve => {
    client.get('/api/hosts').then(res => resolve(res.data));
  });
};

export const getHosts = createAsyncThunk(
  'hosts/get',
  async () => {
    return await queryApiForHosts();
  }
);

export const hostsSlice = createSlice({
  name: 'hosts',
  initialState: {hosts: []},
  reducers: {},
  extraReducers: {
    [getHosts.fulfilled]: (state, action) => {
      return {
        ...state,
        hosts: action.payload
      }
    }
  }
});

export const selectHosts = state => state.hosts;

export default hostsSlice.reducer;
