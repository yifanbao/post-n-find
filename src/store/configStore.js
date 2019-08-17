import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import foundNoticesReducer from './reducers/foundNotices';

const rootReducer = combineReducers({
  foundNotices: foundNoticesReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));
};

export default configStore;
