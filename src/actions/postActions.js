export const addPost = (post) => async (dispatch, getState, getFirestore) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  const tags = getState().newPost.newPostTags;
  const tagList = [...new Set(Object.values(tags).filter((id) => id !== ''))];
  const categoryId = Math.floor(Math.random() * 3);

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
  console.log(newPost);

  try {
    await firestore.collection('posts').add(newPost);
    dispatch({ type: 'ADD_POST', post });
  } catch (err) {
    dispatch({ type: 'ADD_POST_FAILURE', err });
  }
};

export const addTag = (tag) => ({
  type: 'ADD_TAG',
  tag,
});

export const clearTags = (newTags) => ({
  type: 'CLEAR_TAGS',
  newTags,
});
