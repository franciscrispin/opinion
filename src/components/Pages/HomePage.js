import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Toolbar from '../Toolbar/Toolbar';
import SideNavigation from '../SideNavigation';
import CardAddPost from '../Cards/CardAddPost';
import Category from '../Category';
import { setUpvoteState } from '../../actions/upvoteActions';
import { upvotesReducer } from '../../utils/index';
import './HomePage.css';

class HomePage extends React.Component {
  componentDidUpdate() {
    const { auth, posts, users } = this.props;

    if (posts.length && auth.uid && Object.keys(users).length) {
      const userUpvotedPosts = users[auth.uid].upvoted;
      const upvoteState = posts
        .map((post) => ({
          id: post.id,
          upvotes: post.upvotes,
          isActive: userUpvotedPosts.some((id) => id === post.id),
        }))
        .reduce(upvotesReducer, {});
      this.props.setUpvoteState(upvoteState);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.hash === nextProps.location.hash;
  }

  render() {
    const { auth, profile, categories, chipFilter, posts } = this.props;
    const uid = auth.uid;
    if (!uid) return <Redirect to="/login" />;

    if (posts.length && categories.length) {
      return (
        <div>
          <Toolbar profile={profile} />
          <div className="home-wrapper">
            <div className="spacer">
              <div className="navigation-wrapper">
                <SideNavigation />
              </div>
            </div>
            <div className="layout-wrapper">
              <div className="newpost-wrapper">
                <CardAddPost profile={profile} />
              </div>
              {categories.map((category) => (
                <Category
                  key={category.id}
                  posts={category.posts}
                  category={category.name}
                  tagNames={category.tagNames}
                  chipFilter={chipFilter}
                />
              ))}
            </div>
            <div className="spacer" />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

HomePage.defaultProps = {
  categories: [],
  users: {},
  posts: [],
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  chipFilter: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    categories: state.firestore.ordered.categories,
    posts: state.firestore.ordered.posts,
    users: state.firestore.data.users,
    chipFilter: state.chipFilter,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { setUpvoteState }
  ),
  // connect component with firestoreReducer
  firestoreConnect([
    // connect component to specific collection in firestore
    { collection: 'categories' },
    { collection: 'users' },
    { collection: 'posts' },
  ])
)(HomePage);
