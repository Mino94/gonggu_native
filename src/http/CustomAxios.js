import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.34:8000';
export const customAxios = async (url, method, data) => {
  const response = await axios({
    url,
    method,
    data,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // },
  });

  return response.data;
};
