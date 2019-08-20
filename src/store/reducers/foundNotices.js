import { SET_FOUND_NOTICES, REMOVE_FOUND_NOTICE } from '../actions/actionTypes';

const initialState = {
  foundNotices: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOUND_NOTICES:
      return {
        ...state,
        foundNotices: action.foundNotices
      };
    case REMOVE_FOUND_NOTICE:
      return {
        ...state,
        foundNotices: state.foundNotices.filter(({ key }) => {
          return key !== action.key;
        })
      };
    default:
      return state;
  }
};

export default reducers;
