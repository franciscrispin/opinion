import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ChipMinimizedPost, { ChipCategory } from './Chips/ChipMinimizedPost';
import CardMinimizedPost from './Cards/CardMinimizedPost';
import { formatCategory, sortPosts } from '../utils/index';
import './Pages/HomePage.css';

const Category = ({ posts, category, tagNames, chipFilter }) => {
  // sort post by date created
  const sortedPosts = sortPosts(posts);

  // filter post by tag filter
  const categoryLower = formatCategory(category);
  const tagFilter = chipFilter[categoryLower];
  const filteredPosts = sortedPosts
    .map((post) => {
      let show;
      show = post.tagNames.length
        ? post.tagNames.some((tag) => tagFilter[tag] === true)
        : true;
      return { ...post, show };
    })
    .filter((post) => post.show !== false);

  const displayPosts = filteredPosts.length ? (
    filteredPosts.map((post) => (
      <CardMinimizedPost key={post.id} posts={post} />
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
  chipFilter: PropTypes.object.isRequired,
};

export default Category;
