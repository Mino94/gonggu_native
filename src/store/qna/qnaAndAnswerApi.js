import {CustomAxios} from '../../http/CustomAxios';
import axios from 'axios';
export const insertQnaApi = params => {
  console.log('insertQnaApi', params);
  return axios.post('http://192.168.219.101:8080/qna', params);
};

export const selectQnaApi = () => {
  return axios.get('http://192.168.219.101:8080/qna');
};
export const insertAnswerApi = params => {
  console.log('insertAnswerApi params', params);
  return CustomAxios('/qna/answer', 'put', params);
};

export const deleteAnswerApi = params => {
  console.log('deleteAnswerApi params', params);
  return CustomAxios('/qna/answer', 'put', params);
};
