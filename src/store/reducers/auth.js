import * as actionsTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START: return authStart(state, action);
    case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionsTypes.AUTH_FAIL: return authFail(state, action);
    default: return state;
  }
};

export default reducer;
