import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from './components/Account/Account';
import Navigation from './components/Navigation';
import Profile from './components/Profile/Profile';
import App from './components/App';
import Login from './components/Login/Login';
import Register from './components/Register';
import SampleReduxContainer from './components/SampleReduxContainer';

export default (
  <div>
    <Navigation />
    <div>
      <Switch>
        <Route exact path={'/'} component={App} />
        <Route path={'/account'} component={Account} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/redux'} component={SampleReduxContainer} />
        <Route path={'/profile'} component={Profile} />        
      </Switch>
    </div>
  </div>
);