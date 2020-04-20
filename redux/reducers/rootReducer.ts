import { combineReducers } from 'redux';
import appStateReducer from './appStateReducer';

const rootReducer = combineReducers({
  appState: appStateReducer
});

export default rootReducer;