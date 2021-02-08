import * as actionTypes from "./actionTypes";
import axios from "axios";

//*Here are the pieces
export const authStart = () => {
  //no inputs needed
  return { type: actionTypes.AUTH_START };
};
export const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, authData: authData };
};
export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
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
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
