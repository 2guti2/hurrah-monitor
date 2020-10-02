import { createSlice } from '@reduxjs/toolkit';
import client from '../../controllers/HttpClient'

const localStorageSessionKey = 'session';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: JSON.parse(localStorage.getItem(localStorageSessionKey)),
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    destroySession: () => {
      localStorage.removeItem(localStorageSessionKey);
      return null;
    }
  },
});

export const { login, destroySession } = sessionSlice.actions;

export const initSession = () => dispatch => {
  client.post(`/api/sessions`, {username: 'admin', password: 'Passw0rd!'}).then(res => {
    const user = {
      token: res.data.token,
      name: 'admin'
    };
    localStorage.setItem(localStorageSessionKey, JSON.stringify(user));
    dispatch(login(user))
  });
};

export const selectSession = state => state.session;

export default sessionSlice.reducer;
