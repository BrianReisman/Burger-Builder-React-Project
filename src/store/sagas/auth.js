import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects"; //put dispatches a new action
import axios from "axios";

import * as actions from "../actions/index";
// argument is gotten automatically from redux-saga
// a * after function makes it a generator. A function that can be called incrementally. Can be paused during execution. Every step needs a yield keyword

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFEhaRCAOToY-m3NNwmtVqTeiHJaPIl3Q";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFEhaRCAOToY-m3NNwmtVqTeiHJaPIl3Q";
  }
  try {
    //*Try catch as alt. to .then.catch
    const res = yield axios.post(url, authData);

    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    console.log(err.response);
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate < new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
