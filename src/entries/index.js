import './index.html';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';
import sagas from '../sagas/index';
import App from '../containers/App';

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
    <App />
  </Provider>,
  document.getElementById('root')
);
