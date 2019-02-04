import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import Toolbar from '../Toolbar/Toolbar';
import SideNavigation from '../SideNavigation';
import CardAddPost from '../Cards/CardAddPost';
import ChipMinimizedPost, { ChipCategory } from '../Chips/ChipMinimizedPost';
import CardMinimizedPost from '../Cards/CardMinimizedPost';
import './HomePage.css';

const Category = ({ posts, category, tagNames }) => {
  if (posts.length) {
    return (
      <div>
        <div className="chip-wrapper">
          <ChipMinimizedPost
            children={<ChipCategory category={category} />}
            tags={tagNames}
          />
        </div>
        <div className="card-wrapper">
          {posts.map((post) => (
            <CardMinimizedPost key={post.id} posts={post} />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Category.defaultProps = {
  posts: [],
};

Category.propTypes = {
  posts: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  tagNames: PropTypes.array.isRequired,
};

const HomePage = ({ auth, profile, categories }) => {
  if (!auth.uid) return <Redirect to="/login" />;

  if (isLoaded(profile) && categories.length) {
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
};

HomePage.defaultProps = {
  categories: [],
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    categories: state.firestore.ordered.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  // connect component with firestoreReducer
  firestoreConnect([
    // connect component to specific collection in firestore
    { collection: 'categories' },
    { collection: 'posts' },
  ])
)(HomePage);
