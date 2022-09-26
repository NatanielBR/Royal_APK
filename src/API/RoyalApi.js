import axios from 'axios';
/* baseURL: 'https://royalapi.herokuapp.com', */
const Api = axios.create({
  baseURL: 'https://royal0api.herokuapp.com',
});

export default Api;
