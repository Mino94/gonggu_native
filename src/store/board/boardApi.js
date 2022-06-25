import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { READ_FAIL, CREATE_SUCCESS, CREATE_FAIL, UPDATE_VALUE, READ_SUCCESS, UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from './actionType';
import { customAxios } from "../customAxios";
import { CustomAxios, CustomFileAxios, storeToken } from '../../http/CustomAxios';

//게시글 등록

const postBoardApi = (params) => {
	return axios.post(
		"http://localhost:8080/board",
		params,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjU2MTI1MzQyfQ.rVZ2g1atYWWtHHuBs_JHJyh9_AketyvpwBZU1gFbIt4`,
			}
		}
	)
}

export const postBoard = function* (action) {
	try {
		const result = yield call(postBoardApi, action.params);
		yield put({ type: CREATE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
	} catch (err) {
		yield put({ type: CREATE_FAIL, data: err.response.data });
	}
}

//board의 state 업데이트
export const updateValue = function(action) {
	put({ type: UPDATE_VALUE, data: action.params });
}


//id로 특정 board 조회
export const selectValue = function* (action) {
	try {
		const result = yield call(getBoardApi, action.id);
		yield put({ type: READ_SUCCESS, data: result });
	} catch(err) {
		yield put({ type: READ_FAIL, data: err});
	}
}

const getBoardApi = (id) => {
	return CustomAxios(
		`/board/${id}`,
		"get");
}

//게시글 수정
const updateBoardApi = (params) => {
	storeToken();
	return CustomFileAxios(
		"/board/0",
		"put",
		params);
}

export const updateBoard = function* (action) {
	try {
		const result = yield call(updateBoardApi, action.params);
		yield put({ type: UPDATE_SUCCESS, data: result });
	} catch(err) {
		yield put({ type: UPDATE_FAIL, data: err });
	}
}

const deleteBoardApi = ({id}) => {
	return CustomAxios(
		`/board/${id}`,
		"delete"
	);
}

export const deleteBoard = function* (action) {
	try {
		const result = yield call(deleteBoardApi, action);
		if(result) yield put({ type: DELETE_SUCCESS, data: result });
		else yield put({ type: DELETE_FAIL, data: result });
	} catch(err) {
		yield put({ type: DELETE_FAIL, data: err });
	}
}
