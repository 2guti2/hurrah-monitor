import axios from 'axios';

export const localStorageSessionKey = 'session';
const session = JSON.parse(localStorage.getItem(localStorageSessionKey));

const client = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 100000,
  headers: {
    'content-type': 'application/json' ,
    'Authorization': session ? session.token : ''
  },
});

// Custom middleware for requests (this one just logs the error).
client.interceptors.request.use(config => config, (error) => {
  console.log('Failed to make request with error:');
  console.log(error);
  return Promise.reject(error);
});

// Custom middleware for responses (this one just logs the error).
client.interceptors.response.use(response => response, (error) => {
  console.log('Request got response with error:');
  console.log(error);
  return Promise.reject(error);
});

// Error middleware. Makes the back end error message consistent with front-end fabricated errors.
client.interceptors.response.use(response => response, (error) => {
  const errorMsg = error.response.data.error;
  return Promise.reject(new Error(errorMsg));
});

export default client;
