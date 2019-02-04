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

const Category = ({ posts, category, tags }) => {
  const tagsWithDups = posts
    .map((post) => post.tagList)
    .reduce((a, b) => [...a, ...b], []);
  const tagsWoDups = [...new Set(tagsWithDups)];
  // coerce id number to match id string
  const tagNames = tagsWoDups.map(
    (tagNum) => tags.find((tag) => tag.id == tagNum).tag
  );

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
  tags: PropTypes.array.isRequired,
};

const HomePage = ({ auth, profile, categories, tags }) => {
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
                tags={tags}
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
  tags: [],
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    categories: state.firestore.ordered.categories,
    tags: state.firestore.ordered.tags,
  };
};

export default compose(
  connect(mapStateToProps),
  // connect component with firestoreReducer
  firestoreConnect([
    // connect component to specific collection in firestore
    { collection: 'categories' },
    { collection: 'tags' },
  ])
)(HomePage);
