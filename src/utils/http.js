import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:9999/enjoytrip',
  headers: {
    'Context-Type': 'application/json',
  },
});
