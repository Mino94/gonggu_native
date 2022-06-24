import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './saga';

const sagaMiddleware = createSagaMiddleware(); // 사가미들웨어 객체 생성
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)); // 스토어 객체 생성

sagaMiddleware.run(rootSaga); // 사가 미들웨어로 루트사가를 실행한다.

export default store;
