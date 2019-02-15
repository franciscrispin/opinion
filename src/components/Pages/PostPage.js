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
import { setUpvoteState } from '../../actions/upvoteActions';
import { updatePostUpvotes } from '../../utils/index';
import './PostPage.css';

class PostPage extends React.Component {
  componentDidUpdate() {
    const { auth, posts, users } = this.props;
    updatePostUpvotes(auth, posts, users, this.props.setUpvoteState);
  }

  render() {
    const { profile, posts, match, isUpvoteUpdated } = this.props;
    const postId = match.params.post_id;

    if (posts.length && isUpvoteUpdated) {
      // double equals to coerce postId from string to number
      // eslint-disable-next-line
      const post = posts.find((post) => post.id == postId);
      const comments = post ? post.commentList : null;
      const tagNames = post ? post.tagNames : null;

      return (
        <div>
          <Toolbar profile={profile} />
          {post && (
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
  }
}

PostPage.defaultProps = {
  posts: [],
  users: {},
};

PostPage.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  isUpvoteUpdated: PropTypes.bool.isRequired,
  setUpvoteState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    posts: state.firestore.ordered.posts,
    users: state.firestore.data.users,
    isUpvoteUpdated: state.upvote.isUpdated,
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { setUpvoteState }
  ),
  firestoreConnect([{ collection: 'posts' }, { collection: 'users' }])
)(PostPage);
