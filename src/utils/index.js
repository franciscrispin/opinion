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

// reduce post array to an object with ids as keys
export const upvotesReducer = (a, b) => ({
  ...a,
  [b.id]: { upvotes: b.upvotes, isActive: b.isActive },
});
