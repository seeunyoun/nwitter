import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/Profile.js';
import Navigation from './Navigation';

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          {isLoggedIn && <Navigation userObj={userObj} />}
          <Switch>
            {isLoggedIn ? (
              <>
                <Route exact path='/'>
                  <Home userObj={userObj} />
                </Route>
                <Route exact path='/profile'>
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                </Route>
              </>
          ) : (
            <Route exact path='/'>
              <Auth />
            </Route>
          )}
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter