import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Home from './Pages/HomePage';
import Post from './Pages/PostPage';
import Profile from './Pages/ProfilePage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import { postList, tagList } from './FakeData';

class App extends React.Component {
  render() {
    const { auth } = this.props;
    if (isLoaded(auth)) {
      return (
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route
              path="/post/:post_id"
              render={(props) => (
                <Post {...props} tagList={tagList} postList={postList} />
              )}
            />
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

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(App);
