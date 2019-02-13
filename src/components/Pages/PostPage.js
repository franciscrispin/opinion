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
import { upvotesReducer } from '../../utils/index';
import './PostPage.css';

class PostPage extends React.Component {
  componentDidUpdate() {
    const { auth, posts, users } = this.props;

    if (posts.length) {
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

  render() {
    const { profile, posts, match } = this.props;
    const postId = match.params.post_id;

    if (posts.length) {
      // coerce postId from string to number
      // eslint-disable-next-line
      const post = posts.find((post) => post.id == postId);
      const comments = post ? post.commentList : null;
      const tagNames = post.tagNames;

      return (
        <div>
          <Toolbar profile={profile} />
          {posts.length && (
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
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  posts: state.firestore.ordered.posts,
  auth: state.firebase.auth,
  users: state.firestore.data.users,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { setUpvoteState }
  ),
  firestoreConnect([{ collection: 'posts' }, { collection: 'users' }])
)(PostPage);
