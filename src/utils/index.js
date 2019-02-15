export const formatCategory = (category) =>
  category.toLowerCase().replace(/ /, '');

// sort post by date created
export const sortPosts = (posts) =>
  [...posts].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

// add ellipsis to content exceeding 115 chars
export const truncate = (text) => {
  const maxLen = 110;
  if (text.length > maxLen) {
    const lastWordIdx = text
      .split('')
      .slice(0, maxLen)
      .join('')
      .lastIndexOf(' ');
    return (
      text
        .split('')
        .slice(0, lastWordIdx)
        .join('') + ' ...'
    );
  }
  return text;
};

// reducer fuction to reduce post array to an object
// set post ids as keys and upvote state as values
const upvotesReducer = (a, b) => ({
  ...a,
  [b.id]: { upvotes: b.upvotes, isActive: b.isActive },
});

// updates the state with the no. of upvotes and is upvoted status for each post
export const updatePostUpvotes = (auth, posts, users, setUpvoteState) => {
  if (posts.length && auth.uid && Object.keys(users).length) {
    const userUpvotedPosts = users[auth.uid].upvoted;
    const upvoteState = posts
      .map((post) => ({
        id: post.id,
        upvotes: post.upvotes,
        isActive: userUpvotedPosts.some((id) => id === post.id),
      }))
      .reduce(upvotesReducer, {});
    setUpvoteState(upvoteState);
  }
};
