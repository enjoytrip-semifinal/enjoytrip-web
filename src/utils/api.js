import axios from 'axios';

// local vue api axios instance
function apiInstance() {
  console.log(process.env.VUE_APP_API_BASE_URL);
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset-utf-8',
    },
  });
  return instance;
}

// common data API axios instance
function tripInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_TRIP_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset-utf-8',
    },
  });
  return instance;
}

export { apiInstance, tripInstance };