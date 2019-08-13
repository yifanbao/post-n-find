import { CREATE_FOUND_NOTICE, DELETE_FOUND_NOTICE } from '../actions/actionTypes';
import itemImage from '../../assets/NYC.jpeg';

const initialState = {
  foundNotices: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOUND_NOTICE:
      return {
        ...state,
        foundNotices: state.foundNotices.concat({
          key: Math.random().toString(),
          title: action.title,
          image: itemImage
        })
      };
    case DELETE_FOUND_NOTICE:
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
