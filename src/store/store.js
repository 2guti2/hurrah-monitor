import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../containers/session/sessionSlice';
import hostsReducer from '../containers/dashboard/hostsSlice';
import loadsReducer from '../containers/dashboard/loads/loadSlice';
import reportsReducer from '../containers/dashboard/reports/reportsSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    hosts: hostsReducer,
    loads: loadsReducer,
    reports: reportsReducer
  },
});
