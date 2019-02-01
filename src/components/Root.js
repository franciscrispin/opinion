import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Pages/HomePage';
import Post from './Pages/PostPage';
import Profile from './Pages/ProfilePage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import {
  isAuthed,
  userData,
  categoryData,
  postList,
  tagList,
} from './FakeData';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route
        exact
        path="/home"
        render={(props) => (
          <Home
            {...props}
            categoryData={categoryData}
            cardData={postList}
            userData={userData}
            isAuthed={isAuthed}
            tagList={tagList}
          />
        )}
      />
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

export default Root;
