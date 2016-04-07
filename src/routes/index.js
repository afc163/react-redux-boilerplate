import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import App from '../containers/App';

const Foo = (props) =>
  <div>
    Foo
  </div>

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/foo" component={Foo} />
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
