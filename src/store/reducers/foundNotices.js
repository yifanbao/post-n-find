import { SET_FOUND_NOTICES, REMOVE_FOUND_NOTICE, START_CREATING_FOUND_NOTICE, FOUND_NOTICE_CREATED } from '../actions/actionTypes';

const initialState = {
  foundNotices: [],
  newFoundNoticeCreated: false
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
    case START_CREATING_FOUND_NOTICE:
      return {
        ...state,
        newFoundNoticeCreated: false
      };
    case FOUND_NOTICE_CREATED:
      return {
        ...state,
        newFoundNoticeCreated: true
      };
    default:
      return state;
  }
};

export default reducers;
