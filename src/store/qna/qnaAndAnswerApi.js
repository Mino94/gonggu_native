import {CustomAxios} from '../../http/CustomAxios';
import axios from 'axios';
export const insertQnaApi = (params) => {
  console.log('insertQnaApi', params);
  return axios.post('http://192.168.0.34:8000/qna', params);
};

export const selectQnaApi = () => {
  return axios.get('http://192.168.0.34:8000/qna');
};
export const insertAnswerApi = (params) => {
  console.log('insertAnswerApi params', params);
  return axios.put('http://192.168.0.34:8000/qna/answer', params);
};

export const deleteAnswerApi = (params) => {
  console.log('deleteAnswerApi params', params);
  return CustomAxios('/qna/answer', 'put', params);
};
