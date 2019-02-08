export const formatCategory = (category) =>
  category.toLowerCase().replace(/ /, '');

// sort post by date created
export const sortPosts = (posts) =>
  [...posts].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
