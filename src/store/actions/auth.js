import AsyncStorage from '@react-native-community/async-storage';

import { AUTHENTICATE_USER, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import { WEB_API_KEY } from '../../config/keys';
import startMainTabs from '../../screens/startMainTabs';
import App from '../../../App';

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

    fetch(baseUrl + WEB_API_KEY, {
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
        dispatch(uiStopLoading());
        alert('Authentication failed :(\nPlease try again!');
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert('Authentication failed :(\nPlease try again!');
        } else {
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expireDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expireDate));
    AsyncStorage.setItem('pnf:auth:token', token);
    AsyncStorage.setItem('pnf:auth:expireDate', expireDate.toString());
    AsyncStorage.setItem('pnf:auth:refreshToken', refreshToken);
  };
};

export const authSetToken = (token, expireDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
    expireDate
  }
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const { token, expireDate } = getState().auth;
      const now = new Date();
      if (token && new Date(expireDate) > now) {
        resolve(token);
      } else {
        let fetchedToken;
        AsyncStorage.getItem('pnf:auth:token')
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject();
              return;
            }
            fetchedToken = tokenFromStorage;
            return AsyncStorage.getItem('pnf:auth:expireDate');
          })
          .then(expireDate => {
            const parsedExpireDate = new Date(parseInt(expireDate));
            if (parsedExpireDate <= now) {
              reject();
            } else {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            }
          })
          .catch(err => reject());
      }
    });

    return promise
      .catch(err => {
        return AsyncStorage.getItem('pnf:auth:refreshToken')
          .then(refreshToken => {
            return fetch(`https://securetoken.googleapis.com/v1/token?key=${WEB_API_KEY}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: `grant_type=refresh_token&refresh_token=${refreshToken}`
            });
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log('Refresh token worked!');
              dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          })
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => {
        console.log('Failed to fetch token!');
      });
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('pnf:auth:token');
    AsyncStorage.removeItem('pnf:auth:expireDate');
    return AsyncStorage.removeItem('pnf:auth:refreshToken');
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
