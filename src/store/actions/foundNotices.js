import { CREATE_FOUND_NOTICE, DELETE_FOUND_NOTICE } from './actionTypes';

export const createFoundNotice = title => {
  return {
    type: CREATE_FOUND_NOTICE,
    title
  };
};

export const deleteFoundNotice = key => {
  return {
    type: DELETE_FOUND_NOTICE,
    key
  };
};
