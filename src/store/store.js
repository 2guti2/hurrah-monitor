import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../containers/session/sessionSlice';
import hostsReducer from '../containers/dashboard/hostsSlice';
import loadsReducer from '../containers/dashboard/loads/loadSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    hosts: hostsReducer,
    loads: loadsReducer
  },
});
