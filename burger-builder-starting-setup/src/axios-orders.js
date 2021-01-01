import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-d8ef0-default-rtdb.firebaseio.com/',
})

export default instance;