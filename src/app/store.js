import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/session/sessionSlice';
import hostsReducer from '../features/dashboard/hostsSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    hosts: hostsReducer
  },
});
