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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout()); //!<<<Always execute functions in dispatch()
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
        // console.log(res);
        // new Date() without an argument gives us now. with argument sets a time. outter sets the expirationData and inner is used to calulate now >>> when expiration happens
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  //This is not async code but it is a composite action factory compound.
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000)) //?!
      }
    }
  };
};
