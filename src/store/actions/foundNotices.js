import { CREATE_FOUND_NOTICE, DELETE_FOUND_NOTICE } from './actionTypes';

export const createFoundNotice = (title, image, location) => {
  return {
    type: CREATE_FOUND_NOTICE,
    title,
    image,
    location
  };
};

export const deleteFoundNotice = key => {
  return {
    type: DELETE_FOUND_NOTICE,
    key
  };
};
