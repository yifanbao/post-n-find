import { SET_LOST_NOTICES, REMOVE_LOST_NOTICE, START_CREATING_LOST_NOTICE, LOST_NOTICE_CREATED } from '../actions/actionTypes';

const initialState = {
  lostNotices: [],
  newLostNoticeCreated: false
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOST_NOTICES:
      return {
        ...state,
        lostNotices: action.lostNotices
      };
    case REMOVE_LOST_NOTICE:
      return {
        ...state,
        lostNotices: state.lostNotices.filter(({ key }) => {
          return key !== action.key;
        })
      };
    case START_CREATING_LOST_NOTICE:
      return {
        ...state,
        newLostNoticeCreated: false
      };
    case LOST_NOTICE_CREATED:
      return {
        ...state,
        newLostNoticeCreated: true
      };
    default:
      return state;
  }
};

export default reducers;
