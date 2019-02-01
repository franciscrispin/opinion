export const addPost = (post) => ({
  type: 'ADD_POST',
  post,
});

export const addTag = (tag) => ({
  type: 'ADD_TAG',
  tag,
});

export const clearTags = (newTags) => ({
  type: 'CLEAR_TAGS',
  newTags,
});
