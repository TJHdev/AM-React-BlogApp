import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddBlogPage from '../components/AddBlogPage';
import EditBlogPage from '../components/EditBlogPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from '../components/Header';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicRoute path="/" component={HomePage} exact={true}/>
        <PublicRoute path="/login" component={LoginPage}/>
        <PrivateRoute path="/read/:id" component={EditBlogPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={AddBlogPage} />
        <PrivateRoute path="/edit/:id" component={EditBlogPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;