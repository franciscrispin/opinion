export const updateUpvotes = (postId, prevUpvotes) => async (
  dispatch,
  getState,
  getFirestore
) => {
  dispatch({ type: 'UPVOTE_REQUEST' });
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const upvotes = getState().upvote.upvoteState[postId].upvotes;

  try {
    // if upvoted, add the post id of the upvoted post to the users document
    // update the number of upvotes in the post document
    if (upvotes > prevUpvotes) {
      await firestore
        .collection('users')
        .doc(uid)
        .update({ upvoted: firestore.FieldValue.arrayUnion(postId) });

      await firestore
        .collection('posts')
        .doc(postId)
        .update({ upvotes });

      dispatch({ type: 'UPVOTE_SUCCESS' });

      // if un-upvoted, remove the post id of the upvoted post from the users document
      // update the number of upvotes in the post document
    } else if (upvotes < prevUpvotes) {
      await firestore
        .collection('users')
        .doc(uid)
        .update({ upvoted: firestore.FieldValue.arrayRemove(postId) });

      await firestore
        .collection('posts')
        .doc(postId)
        .update({ upvotes });

      dispatch({ type: 'UPVOTE_SUCCESS' });
    }
  } catch (err) {
    dispatch({ type: 'UPVOTE_FAILURE' });
  }
};

export const setUpvoteState = (upvoteState) => ({
  type: 'SET_UPVOTE_STATE',
  upvoteState,
});

export const toggleUpvote = (postId) => ({
  type: 'TOGGLE_UPVOTE',
  postId,
});
