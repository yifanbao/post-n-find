import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/types';
import placeImage from '../../assets/NYC.jpeg';

const initialState = {
  places: [],
  selectedPlace: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          name: action.placeName,
          image: placeImage
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(({ key }) => {
          return key !== state.selectedPlace.key;
        }),
        selectedPlace: null
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(({ key }) => {
          return key === action.selectedKey;
        })
      };
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      };
    default:
      return state;
  }
};

export default reducers;
