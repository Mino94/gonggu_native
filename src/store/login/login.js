
import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import produce from "immer";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAIL,INIT} from "./actionType";
import { CustomAxios, getToken, storeToken } from "../../http/CustomAxios";
import messaging from '@react-native-firebase/messaging';

//create ({id: "aaa", pw: "1234"})
export const create = (params) => ({ type: SIGN_UP_REQUEST, params });
export const select = (params) => ({ type: LOGIN_REQUEST, params });
export const init = () => ({ type: INIT });

function signUpApi(params) {
  return axios.post(
    "http://192.168.219.106:8080/user/join",

    params // {params : {id: "aaa", pw: "1234"}}
  );
}

function* signUpUser(action) {
  try {
    const result = yield call(signUpApi, action.params);

    yield put({ type: SIGN_UP_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: SIGN_UP_FAIL, data: err.response.data });
  }
}

function loginApi(params) {
  return axios.post(
    "http://192.168.219.106:8080/user/login",
    params //  {id: "aaa", pw: "1234"}
  );
}

async function sendTokenApi(id) {

	const fcmToken = await messaging().getToken();
	if(fcmToken) {
		console.log("token = ", fcmToken);
	}
	const params = {
		fcmToken: fcmToken,
		userId: id
	}
	console.log("param : ", params);
	CustomAxios(
		"/user/setGoogleToken",
		"post",
		params
	);
}

function* loginUser(action) {

  try {
    const result = yield call(loginApi, action.params);
	sendTokenApi(result.data.id);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAIL,
      data: err.response.data,
    });
  }
}

//사가함수
export function* LoginSaga() {
  console.log("here saga");
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(SIGN_UP_REQUEST, signUpUser);
}

//초기상태
const initialLogin = {
  data: { id: 0, token: "" },
  rData: {
    userId: "",
    password: "",
    name: "",
    postcode: "",
    address1: "",
    address2: "",
    address3: "",
    tel: "",
    bank: "",
    bankaccount: "",
  },
  isLoggedIn: false,//AsyncStorage.getItem("token") ? true : false, // 로그인 여부
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
};

//reducer
const login = (state = initialLogin, action) =>

  produce(state, (draft) => {

    switch (action.type) {
	  case INIT:
		draft.isLoggedIn = false;
		draft.isLoggingOut = false;
		draft.isLoggingIn = false;
		draft.isSignedUp = false;
		draft.isSigningUp = false;
		break;
      case SIGN_UP_REQUEST:
        draft.isSignedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorReason = "";
        break;
      case SIGN_UP_SUCCESS:
        draft.rData.userId = action.data.userId;
        draft.rData.password = action.data.password;
        draft.rData.name = action.data.name;
        draft.rData.postcode = action.data.postcode;
        draft.rData.address1 = action.data.address1;
        draft.rData.address2 = action.data.address2;
        draft.rData.address3 = action.data.address3;
        draft.rData.tel = action.data.tel;
        draft.rData.bank = action.data.bank;
        draft.rData.bankaccount = action.data.bankaccount;

        draft.isSignedUp = true;
        draft.isSigningUp = false;
        break;
      case SIGN_UP_FAIL:
        draft.isSignedUp = false;
        draft.signUpErrorReason = "error";
        break;
      case LOGIN_REQUEST:
        draft.isLoggingIn = true;
        draft.logInErrorReason = "";
        break;
      case LOGIN_SUCCESS:
		storeToken(action.data.token, action.data.id);
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.data.id = action.data.id;
        draft.data.token = action.data.token;
        //isLoading=false;
        break;
      case LOGIN_FAIL:
        draft.isLoggingIn = false;
        draft.isLoggedIn = false;
        draft.logInErrorReason = "error";
        break;
      default:
        return state;
    }
  });


export default login;
