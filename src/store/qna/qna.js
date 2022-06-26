import {takeLatest, takeEvery, call, put} from 'redux-saga/effects';
import produce from 'immer';
import {
  ANSWER_CREATE,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  ANSWER_DELETE,
  ANSWER_DELETE_SUCCESS,
  ANSWER_DELETE_FAIL,
  QNA_CREATE,
  QNA_CREATE_SUCCESS,
  QNA_CREATE_FAIL,
  QNA_SELECT,
  QNA_SELECT_SUCCESS,
  QNA_SELECT_FAIL,
} from './actionType';
import {
  deleteAnswerApi,
  insertAnswerApi,
  insertQnaApi,
  selectQnaApi,
} from './qnaAndAnswerApi';

//액션 함수
export const qnaCreate = params => ({type: QNA_CREATE, params});
export const qnaSelect = () => ({type: QNA_SELECT});

// answer 액션 함수
export const answerCreate = params => ({type: ANSWER_CREATE, params});
export const answerDelete = params => ({type: ANSWER_DELETE, params});

function* insertAnswer(action) {
  try {
    console.log('action', action);

    const result = yield call(insertAnswerApi, action.params);

    yield put({type: ANSWER_CREATE_SUCCESS, data: result.data}); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({type: ANSWER_CREATE_FAIL, data: err.response.data});
  }
}

function* deleteAnswer(action) {
  console.log('action', action);
  try {
    const result = yield call(deleteAnswerApi, action.params);

    yield put({type: ANSWER_DELETE_SUCCESS, data: result.data}); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({type: ANSWER_DELETE_FAIL, data: err.response.data});
  }
}

function* insertQna(action) {
  try {
    const result = yield call(insertQnaApi, action.params);
    yield put({type: QNA_CREATE_SUCCESS, data: result.data}); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({type: QNA_CREATE_FAIL, data: err.response.data});
  }
}

function* selectQna() {
  try {
    const result = yield call(selectQnaApi);
    yield put({type: QNA_SELECT_SUCCESS, data: result.data}); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({type: QNA_SELECT_FAIL, data: err.response.data});
  }
}

//사가함수
export function* QnaSaga() {
  yield takeLatest(QNA_CREATE, insertQna);
  yield takeLatest(QNA_SELECT, selectQna);
  yield takeLatest(ANSWER_CREATE, insertAnswer);
  yield takeLatest(ANSWER_DELETE, deleteAnswer);
}

//초기상태
const initialBoard = {
  data: [],
  loading: false,
  success: false,
};

//reducer
const qna = (state = initialBoard, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ANSWER_CREATE:
        draft.loading = true;
        break;
      case ANSWER_CREATE_SUCCESS:
        console.log(action);
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case ANSWER_CREATE_FAIL:
        draft.loading = false;
        break;
      case ANSWER_DELETE:
        draft.loading = true;
        break;
      case ANSWER_DELETE_SUCCESS:
        draft.data = action;
        draft.loading = false;
        draft.success = true;
        break;
      case ANSWER_DELETE_FAIL:
        draft.loading = false;
        break;
      case QNA_CREATE:
        draft.loading = true;
        break;
      case QNA_CREATE_SUCCESS:
        console.log(action);
        draft.data = action;
        draft.loading = false;
        draft.success = true;
        break;
      case QNA_CREATE_FAIL:
        draft.loading = false;
        break;
      case QNA_SELECT:
        draft.loading = true;
        draft.success = false;
        break;
      case QNA_SELECT_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case QNA_SELECT_FAIL:
        draft.loading = false;
        draft.success = false;
        break;
      default:
        return state;
    }
  });

export default qna;
