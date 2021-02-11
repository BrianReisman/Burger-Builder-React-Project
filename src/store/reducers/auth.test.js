//no need to import enzyme or react because we are not *rendering* anything. Just testing the functions themselves.
//*you are testing the reducer here, not redux.

import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    //"expect the reducer **invoked** with an [undefined state] and an [empty action object] like on first render toEqual, the initState object I set in the auth.js file." //*.toEqual() seems to refer to what is _returned_
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-userId",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    })
  });
});
