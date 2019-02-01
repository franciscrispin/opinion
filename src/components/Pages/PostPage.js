import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import ChipFullPost from '../Chips/ChipFullPost';
import CardFullPost from '../Cards/CardFullPost';
import CardComment from '../Cards/CardComment';
import './PostPage.css';

const PostPage = ({ postList, tagList, ...props }) => {
  const postId = props.match.params.post_id;
  // coerce postId from string to number
  const selectedPost = postList.find((post) => post.id == postId);
  const postComments = selectedPost ? selectedPost.commentList : null;
  const tags = selectedPost.tagList;

  return (
    <div>
      <Toolbar />
      {postComments && (
        <div className="post-wrapper">
          <div className="chip-wrapper">
            <ChipFullPost tags={tags} tagList={tagList} />
          </div>
          <div className="card-expanded-wrapper">
            <CardFullPost postData={selectedPost} />
            {postComments.map((comment) => (
              <CardComment key={comment.commentId} commentData={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

PostPage.propTypes = {
  postList: PropTypes.array.isRequired,
  tagList: PropTypes.object.isRequired,
};

export default withRouter(PostPage);
