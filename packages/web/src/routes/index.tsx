import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import CustomerList from '../pages/Customer/List';
import CustomerRegister from '../pages/Customer/Register';
import CustomerUpdate from '../pages/Customer/Update';
import CustomerReport from '../pages/Customer/Report';

import ContactList from '../pages/Contact/List';
import ContactRegister from '../pages/Contact/Register';
import ContactUpdate from '../pages/Contact/Update';

import Dashboard from '../pages/Dashboard';

ContactRegister.displayName = 'add';
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="/customer/list" exact component={CustomerList} isPrivate />
    <Route path="/customer/update" exact component={CustomerUpdate} isPrivate />

    <Route
      path="/customer/register"
      exact
      component={CustomerRegister}
      isPrivate
    />

    <Route path="/customer/report" exact component={CustomerReport} isPrivate />

    <Route path="/contact/list" exact component={ContactList} isPrivate />
    <Route
      path="/contact/register"
      exact
      component={ContactRegister}
      isPrivate
    />
    <Route path="/contact/update" exact component={ContactUpdate} isPrivate />
  </Switch>
);

export default Routes;
