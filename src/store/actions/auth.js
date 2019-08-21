import { AsyncStorage } from 'react-native';

import { AUTHENTICATE_USER, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import { WEB_API_KEY } from '../../config/keys';
import startMainTabs from '../../screens/startMainTabs';

export const authenticateUser = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());

    let baseUrl = '';
    switch (authMode) {
      case 'login':
        baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        break;
      case 'signup':
        baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    }

    fetch(
      baseUrl + WEB_API_KEY,
      {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .catch(err => {
          console.log(err);
          alert('Authentication failed :(\nPlease try again!');
          dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes);
          dispatch(uiStopLoading());
          if (!parsedRes.idToken) {
            alert('Authentication failed :(\nPlease try again!');
          } else {
            dispatch(authSetToken(parsedRes.idToken));
            startMainTabs();
          }
        })
  }
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem('pnf:auth:token', token);
  }
};


export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token
  }
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const { token } = getState().auth;
      if (!token) {
        AsyncStorage.getItem('pnf:auth:token')
          .then(tokenFromStorage => {
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise;
  }
};
