import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import {
	CREATE,
	CREATE_SUCCESS,
	CREATE_FAIL,
	UPDATE_VALUE,
	READ_VALUE,
	READ_SUCCESS,
	UPDATE,
	UPDATE_SUCCESS,
	UPDATE_FAIL,
	INIT,
	DELETE,
	DELETE_SUCCESS,
	DELETE_FAIL
} from "./actionType";
import { postBoard, updateValue, selectValue, updateBoard, deleteBoard } from "./boardApi";
import AsyncStorage from "@react-native-community/async-storage";

//액션 함수
export const create = (params) => ({ type: CREATE, params });
export const update = (params) => ({ type: UPDATE_VALUE, params });
export const select = (id) => ({ type: READ_VALUE, id });
export const updateData = (params) => ({ type: UPDATE, params });
export const init = () => ({ type: INIT });
export const deleteData = (id) => ({ type: DELETE, id });

//사가함수
export function* BoardSaga() {
	yield takeLatest(CREATE, postBoard);
	yield takeLatest(UPDATE_VALUE, updateValue);
	yield takeLatest(READ_VALUE, selectValue);
	yield takeLatest(UPDATE, updateBoard);
	yield takeLatest(DELETE, deleteBoard);
}

//초기상태
const initialBoard = {
	data: {},
	loading: false,
	success: false,
	delete: false
};

//reducer
const board = (state = initialBoard, action) =>
	produce(state, (draft) => {
		switch (action.type) {
		case INIT:
			draft.loading = false;
			draft.success = false;
			draft.delete = false;
			break;
		case CREATE:
			draft.loading = true;
			draft.success = false;
			break;
		case CREATE_SUCCESS:
			draft.data = action.data;
			draft.loading = false;
			draft.success = true;
			break;
		case CREATE_FAIL:
			draft.success = false;
			draft.loading = false;
			break;
		case UPDATE_VALUE:
			draft.data.set(action.params.id, action.params.value);
			break;
		case READ_SUCCESS:
			draft.success = false;
			draft.loading = false;
			draft.data = action.data;
			break;
		case UPDATE:
			draft.loading = true;
			draft.success = false;
			break;
		case UPDATE_SUCCESS:
			draft.loading = false;
			draft.success = true;
			draft.data = action.data;
			break;
		case UPDATE_FAIL:
			draft.loading = false;
			draft.success = false;;
			break;
		case DELETE:
			draft.loading = true;
			draft.success = false;
			break;
		case DELETE_SUCCESS:
			draft.data = {};
			draft.loading = false;
			draft.delete = true;
			break;
		case DELETE_FAIL:
			draft.loading = false;
			draft.delete = false;
			break;
		default:
			return state;
		}
	});

export default board;
