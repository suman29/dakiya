import Parse from 'parse';
import Constants from '../appConfig';
import * as actionTypes from '../util/actionsTypes';

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

function requestLogin() {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
}

function loginSuccess(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
}

function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  }
}

function logoutRequest() {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  }
}

function logutComplete() {
  return {
    type: actionTypes.LOGOUT_COMPLETE,
  }
}

export const login = data => (
  (dispatch) => {
    const name = data.username,
      pswd = data.password;

    dispatch(requestLogin());
    Parse.User.logIn(name, pswd, {
      success: function (user) {
        console.log("UserID: ", user.get('username'));
        dispatch(loginSuccess(user));
      },
      error: function (user, error) {
        dispatch(loginFailure(error));
      }
    });
  }
);

export const logout = () => ((dispatch) => {
  dispatch(logoutRequest());
  Parse.User.logOut();
  dispatch(logutComplete());
});
