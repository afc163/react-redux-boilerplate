import './index.html';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createSelector } from 'reselect';
import createSagaMiddleware, { isCancelError } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

//////////////////////
// Action Types

const COUNT_DECREASE = 'count/decrease';
const COUNT_REDUCE = 'count/reduce';
const COUNT_DECREASE_ASYNC = 'count/decrease/async';

//////////////////////
// Selectors

const selectors = createSelector([
  state => state.count,
], (count) => {
  return { count };
});

//////////////////////
// Components

class Count extends Component {
  render() {
    const { dispatch, count } = this.props;
    return <div>
      <div>{count}</div>
      <button onClick={() => { dispatch({ type: COUNT_DECREASE }); }}>+</button>
      <button onClick={() => { dispatch({ type: COUNT_REDUCE }); }}>-</button>
      <button onClick={() => { dispatch({ type: COUNT_DECREASE_ASYNC }); }}>+ (async)</button>
    </div>;
  }
}

//////////////////////
// AppContainer

class App extends Component {

  render() {
    return <div>
      <h1>Demo</h1>
      <Count {...this.props} />
    </div>;
  }
}

const AppContainer = connect(selectors)(App);

//////////////////////
// Reducers

const reducers = combineReducers({
  count: handleActions({
    [COUNT_DECREASE](state) {
      return state + 1;
    },
    [COUNT_REDUCE](state) {
      return state - 1;
    },
  }, 0),
});

//////////////////////
// Sagas

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function* decreaseCountWithDelay() {
  try {
    yield call(delay, 300);
    yield put({ type: 'count/decrease' });
  } catch (e) {
    if (isCancelError(e)) {}
  }
}

function* countSaga(getState) {
  let task;
  while (true) {
    yield take(COUNT_DECREASE_ASYNC);
    if (task) yield cancel(task);
    task = yield fork(decreaseCountWithDelay);
  }
}

function* sagas(getState) {
  yield fork(countSaga, getState);
}

//////////////////////
// Store

const initialState = {};
const enhancer = compose(
  applyMiddleware(createSagaMiddleware(sagas)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(reducers, initialState, enhancer);

//////////////////////
// Entry

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
