import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './types';

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    placeName
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  };
};

export const selectPlace = selectedKey => {
  return {
    type: SELECT_PLACE,
    selectedKey
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  }
};
