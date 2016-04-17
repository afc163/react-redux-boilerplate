import { handleActions } from 'redux-actions';

import { COUNT_INCREASE, COUNT_DECREASE } from '../constants/count';

export default handleActions({
  [COUNT_INCREASE](state) {
    return state + 1;
  },
  [COUNT_DECREASE](state) {
    return state - 1;
  },
}, 0);
