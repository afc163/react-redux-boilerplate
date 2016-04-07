import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Count from '../components/Count/Count';
import { Link } from 'react-router';

const App = (props) =>
  <div>
    <h1>Demo</h1>
    <Count {...props} />
    <br />
    <Link to="/foo">Go To Foo</Link>
  </div>

App.propTypes = {
};

const selectors = createSelector([
  state => state.count,
], (count) => {
  return { count };
});

export default connect(selectors)(App);
