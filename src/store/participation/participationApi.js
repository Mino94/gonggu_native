
import { call, put } from "redux-saga/effects";
import { CustomAxios } from "../../http/CustomAxios";
import { PARTI_JOIN_LIST_FAIL, PARTI_CREATE_FAIL, PARTI_CREATE_SUCCESS, PARTI_DELETE_SUCCESS, PARTI_DELETE_FAIL, PARTI_JOIN_STATE_SUCCESS, PARTI_JOIN_STATE_FAIL, PARTI_JOIN_LIST_SUCCESS } from "./actionType";

//공구 참가
const joinParticipationApi = (params) => {
	return CustomAxios(`/participation/${params}`, "post");
}

export const joinParticipation = function* (action) {
	try {
		const result = yield call(joinParticipationApi, action.params);
		yield put({ type: PARTI_CREATE_SUCCESS, data: result.data });
	} catch(err) {
		yield put({ type: PARTI_CREATE_FAIL, data: err.response.data });
	}
}

//공구 취소
const exitParticipationApi = (params) => {
	return CustomAxios(`/participation/${params}`, "delete");
}

export const exitParticipation = function* (action) {
	try {
		const result = yield call(exitParticipationApi, action.params);
		yield put({ type: PARTI_DELETE_SUCCESS, data: result.data });
	} catch(err) {
		yield put({ type: PARTI_DELETE_FAIL, data: err });
	}
}

//공구 참여 여부 확인
const checkJoinStateApi = (boardId) => {
	return CustomAxios(
		`/participation/${boardId}`
		, "get");
}

export const checkJoinState = function* (action) {
	try {
		const result = yield call(checkJoinStateApi, action.params);
		yield put({ type: PARTI_JOIN_STATE_SUCCESS, data: result});
	} catch(err) {
		yield put({ type: PARTI_JOIN_STATE_FAIL, data: err});
	}
}

//공구 참여 리스트
const getjoinListApi = (boardId) => {
	return CustomAxios(
		`/participation/${boardId}/all`
		, "get"
	);
}

export const getjoinList = function* (action) {
	try {
		const result = yield call(getjoinListApi, action.params);
		yield put({ type: PARTI_JOIN_LIST_SUCCESS, data: result });
	} catch(err) {
		yield put({ type: PARTI_JOIN_LIST_FAIL, data: err});
	}
}
