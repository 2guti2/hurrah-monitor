import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client, { localStorageSessionKey } from '../../controllers/HttpClient'

const queryApiForLogin = user => {
  return new Promise(resolve => {
    client.post('/api/sessions', user).then(res => resolve(res));
  })
};

// doc https://redux-toolkit.js.org/api/createAsyncThunk
export const initSessionAsync = createAsyncThunk(
  'session/initSessionAsync',
  async (user, thunkAPI) => {
    const tokenData = (await queryApiForLogin(user)).data;
    const session = {...tokenData, name: user.username};
    localStorage.setItem(localStorageSessionKey, JSON.stringify(session));
    return session;
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState: JSON.parse(localStorage.getItem(localStorageSessionKey)),
  reducers: {
    destroySession: () => {
      localStorage.removeItem(localStorageSessionKey);
      return null;
    }
  },
  extraReducers: {
    [initSessionAsync.fulfilled]: (state, action) => {
      return {...state, ...action.payload};
    }
  }
});

export const { destroySession } = sessionSlice.actions;

export const selectSession = state => state.session;

export default sessionSlice.reducer;
