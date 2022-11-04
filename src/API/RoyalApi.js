import axios from 'axios';
/* baseURL: 'https://royalapi.herokuapp.com', */
const Api = axios.create({
  baseURL: 'http://royalapi.infinitytec.info/',
});

export default Api;
