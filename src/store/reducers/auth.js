import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: null,
  expireDate: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expireDate: action.expireDate
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expireDate: null
      };
    default:
      return state;
  }
};

export default reducer;
