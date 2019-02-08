export const upvote = (postId, upvotes) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();
  try {
    await firestore
      .collection('posts')
      .doc(postId)
      .update({ upvotes });
    dispatch({ type: 'UPVOTE' });
  } catch (err) {
    dispatch({ type: 'UPVOTE_FAILURE', err });
  }
};
