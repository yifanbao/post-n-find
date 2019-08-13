import { createStore, combineReducers, compose } from 'redux';

import foundNoticesReducer from './reducers/foundNotices';

const rootReducer = combineReducers({
  foundNotices: foundNoticesReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configStore;
