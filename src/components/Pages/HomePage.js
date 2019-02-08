import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import Typography from '@material-ui/core/Typography';
import Toolbar from '../Toolbar/Toolbar';
import SideNavigation from '../SideNavigation';
import CardAddPost from '../Cards/CardAddPost';
import ChipMinimizedPost, { ChipCategory } from '../Chips/ChipMinimizedPost';
import CardMinimizedPost from '../Cards/CardMinimizedPost';
import { getUpvotes } from '../../actions/postButtonActions';
import { formatCategory, sortPosts } from '../../utils';
import './HomePage.css';

const Category = ({ posts, category, tagNames, upvotes, chipFilter }) => {
  // sort post by date created
  const sortedPosts = sortPosts(posts);

  // filter post by tag filter
  const categoryLower = formatCategory(category);
  const tagFilter = chipFilter[categoryLower];
  const filteredPosts = sortedPosts
    .map((post) => {
      const show = post.tagNames.some((tag) => tagFilter[tag] === true);
      return { ...post, show };
    })
    .filter((post) => post.show !== false);

  const displayPosts = filteredPosts.length ? (
    filteredPosts.map((post) => (
      <CardMinimizedPost key={post.id} posts={post} upvotes={upvotes} />
    ))
  ) : (
    <Typography variant="subheading" paragraph>
      No posts yet!
    </Typography>
  );

  return (
    <div id={formatCategory(category)}>
      <div className="chip-wrapper">
        <ChipMinimizedPost
          children={<ChipCategory category={category} />}
          tags={tagNames}
          category={category}
        />
      </div>
      <div className="card-wrapper">{displayPosts}</div>
    </div>
  );
};

Category.defaultProps = {
  posts: [],
};

Category.propTypes = {
  posts: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  tagNames: PropTypes.array.isRequired,
  upvotes: PropTypes.array.isRequired,
  chipFilter: PropTypes.object.isRequired,
};

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUpvotes();
  }

  render() {
    const { auth, profile, categories, upvotes, chipFilter } = this.props;
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
                  upvotes={upvotes}
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
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state.chipFilter);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    categories: state.firestore.ordered.categories,
    chipFilter: state.chipFilter,
    upvotes: state.upvotes.upvotes,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getUpvotes }
  ),
  // connect component with firestoreReducer
  firestoreConnect([
    // connect component to specific collection in firestore
    { collection: 'categories' },
  ])
)(HomePage);
