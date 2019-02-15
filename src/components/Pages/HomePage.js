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
import { updatePostUpvotes } from '../../utils/index';
import './HomePage.css';

class HomePage extends React.Component {
  componentDidUpdate() {
    const { auth, posts, users } = this.props;
    updatePostUpvotes(auth, posts, users, this.props.setUpvoteState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.hash === nextProps.location.hash;
  }

  render() {
    const {
      auth,
      profile,
      categories,
      chipFilter,
      posts,
      isUpvoteUpdated,
    } = this.props;
    const uid = auth.uid;
    if (!uid) return <Redirect to="/login" />;

    if (auth.uid && posts.length && categories.length && isUpvoteUpdated) {
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
  profile: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  chipFilter: PropTypes.object.isRequired,
  isUpvoteUpdated: PropTypes.bool.isRequired,
  setUpvoteState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    categories: state.firestore.ordered.categories,
    posts: state.firestore.ordered.posts,
    users: state.firestore.data.users,
    chipFilter: state.chipFilter,
    isUpvoteUpdated: state.upvote.isUpdated,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { setUpvoteState }
  ),
  firestoreConnect([
    { collection: 'categories' },
    { collection: 'users' },
    { collection: 'posts' },
  ])
)(HomePage);
