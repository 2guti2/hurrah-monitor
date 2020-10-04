import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../../controllers/HttpClient'

const queryApiForHostLoad = (hostId) => {
  return new Promise(resolve => {
    client.get(`/api/hosts/${hostId}/load`).then(res => resolve({hostId, loads: res.data}));
  });
};

// refactor the type to the store/actionNames file
export const getHostLoad = createAsyncThunk(
  'load/get',
  async (hostId) => {
    return await queryApiForHostLoad(hostId);
  }
);

export const hostLoadSlice = createSlice({
  name: 'load',
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
