import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Toolbar from '../Toolbar/Toolbar';
import ChipFullPost from '../Chips/ChipFullPost';
import CardFullPost from '../Cards/CardFullPost';
import CardComment from '../Cards/CardComment';
import './PostPage.css';

const PostPage = ({ profile, posts, ...props }) => {
  const postId = props.match.params.post_id;

  if (posts.length) {
    // coerce postId from string to number
    // eslint-disable-next-line
    const post = posts.find((post) => post.id == postId);
    const comments = post ? post.commentList : null;
    const tagNames = post.tagNames;

    return (
      <div>
        <Toolbar profile={profile} />
        {posts && (
          <div className="post-wrapper">
            <div className="chip-wrapper">
              <ChipFullPost tagNames={tagNames} />
            </div>
            <div className="card-expanded-wrapper">
              <CardFullPost post={post} profile={profile} />
              {comments &&
                comments.map((comment) => (
                  <CardComment key={comment.id} comment={comment} />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

PostPage.defaultProps = {
  posts: [],
};

PostPage.propTypes = {
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    posts: state.firestore.ordered.posts,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  // connect component with firestoreReducer
  firestoreConnect([
    // connect component to specific collection in firestore
    { collection: 'posts' },
  ])
)(PostPage);
