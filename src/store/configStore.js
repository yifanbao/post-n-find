import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from './reducers/auth';
import foundNoticesReducer from './reducers/foundNotices';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  auth: authReducer,
  foundNotices: foundNoticesReducer,
  ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));
};

export default configStore;
