import * as actionTypes from "./actionTypes";
import axios from "axios";

//*Here are the pieces
export const authStart = () => {
  //no inputs needed
  return { type: actionTypes.AUTH_START };
};
export const authSuccess = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken: token, userId: userId };
};
export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
};

export const logout = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())  //!<<<Always execute functions in dispatch()
    }, expirationTime * 1000);
  };
};

//*Here are the pieces put together into one asynch function
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFEhaRCAOToY-m3NNwmtVqTeiHJaPIl3Q";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFEhaRCAOToY-m3NNwmtVqTeiHJaPIl3Q";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};
