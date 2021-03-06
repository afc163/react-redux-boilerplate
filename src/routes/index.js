import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../containers/App';

const Layout = ({ children }) =>
  <div>
    <h1>Demo</h1>
    {children}
    <br />
    <Link to="/">Go To /</Link><br />
    <Link to="/foo">Go To /foo</Link><br />
  </div>

const Foo = (props) =>
  <div>
    Foo
  </div>

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App} />
      <Route path="/foo" component={Foo} />
    </Route>
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
