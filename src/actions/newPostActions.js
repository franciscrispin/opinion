export const addPost = (post) => async (dispatch, getState, getFirestore) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  // get the tag ids of the new post
  const tags = getState().newPost.newPostChips;
  // remove duplicates from the tags array and remove any blank tags
  const tagList = [...new Set(Object.values(tags).filter((id) => id !== ''))];
  // randomly assign a post to each category when created
  const categoryId = Math.floor(Math.random() * 3);

  // add fields to the new post
  const newPost = {
    ...post,
    authorId: authorId,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    categoryId,
    commentList: [],
    comments: 0,
    createdAt: new Date(),
    initials: profile.initials,
    tagList,
    upvotes: 0,
  };

  try {
    // add post to posts collection in firestore
    await firestore.collection('posts').add(newPost);
    dispatch({ type: 'ADD_POST' });
  } catch (err) {
    dispatch({ type: 'ADD_POST_FAILURE', err });
  }
};

export const addChip = (chip) => ({
  type: 'ADD_CHIP',
  chip,
});

export const clearChips = (newChips) => ({
  type: 'CLEAR_CHIPS',
  newChips,
});
