import { put } from "redux-saga/effects"; //put dispatches a new action
import * as actionTypes from "../actions/actionTypes";

// argument is gotten automatically from redux-saga
// a * after function makes it a generator. A function that can be called incrementally. Can be paused during execution. Every step needs a yield keyword

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put({ type: actionTypes.AUTH_LOGOUT });
}
