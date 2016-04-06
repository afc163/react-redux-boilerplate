import styles from './Count.module.less';
import React, { Component, PropTypes } from 'react';
import { COUNT_DECREASE, COUNT_DECREASE_ASYNC, COUNT_REDUCE } from '../../constraints/count';

const Count = ({ dispatch, count }) =>
  <div className={styles.normal}>
    <div>{count}</div>
    <button onClick={() => { dispatch({ type: COUNT_DECREASE }); }}>+</button>
    <button onClick={() => { dispatch({ type: COUNT_REDUCE }); }}>-</button>
    <button onClick={() => { dispatch({ type: COUNT_DECREASE_ASYNC }); }}>+ (async)</button>
  </div>

Count.propTypes = {
  count: PropTypes.any,
};

export default Count;
