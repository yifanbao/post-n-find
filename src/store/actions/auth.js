import { AUTHENTICATE_USER } from './actionTypes';

export const authenticateUser = authData => {
  return {
    type: AUTHENTICATE_USER,
    authData
  }
};
