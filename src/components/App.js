import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Home from './Pages/HomePage';
import Post from './Pages/PostPage';
import Profile from './Pages/ProfilePage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

class App extends React.Component {
  render() {
    const { auth, profile } = this.props;
    if (isLoaded(auth) && isLoaded(profile)) {
      return (
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route path="/post/:post_id" component={Post} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return null;
    }
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(App);
