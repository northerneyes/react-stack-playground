import { combineReducers } from 'redux';

import home from './home/home.reducer';
import help from './help/help.reducer';

export default combineReducers({
  home,
  help,
});
