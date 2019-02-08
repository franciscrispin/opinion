export const getUpvotes = () => async (dispatch, getState, getFirestore) => {
  const firestore = getFirestore();

  try {
    const snapshot = await firestore.collection('posts').get();
    const upvotes = snapshot.docs.map((doc) => ({
      id: doc.id,
      upvotes: doc.data().upvotes,
    }));

    dispatch({ type: 'FETCH_UPVOTES_SUCCESS', upvotes });
  } catch (err) {
    dispatch({ type: 'FETCH_UPVOTES_FAILURE', err });
  }
};

// get snapshot of the value of upvotes
// save it to the store
// increment/decrement the value of the store's upvotes and the value in firestore
export const upvote = (postId, isUpvoted) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();
  try {
    // increment number of upvotes
    const snapshot = await firestore
      .collection('posts')
      .doc(postId)
      .get();
    let upvotes = snapshot.data().upvotes;
    upvotes = isUpvoted ? upvotes - 1 : upvotes + 1;
    console.log(upvotes);
    // add updated number of upvotes to post
    await firestore
      .collection('posts')
      .doc(postId)
      .update({ upvotes });

    dispatch({ type: 'UPVOTE', postId, isUpvoted });
  } catch {
    dispatch({ type: 'UPVOTE_FAILURE' });
  }
};

export const upvoteCache = (postId, isUpvoted) => (dispatch, getState) => {
  let upvotes = getState().upvotes.upvotes.find((p) => {
    return p.id === postId;
  }).upvotes;
  console.log(`before: ${upvotes}`);
  upvotes = isUpvoted ? upvotes - 1 : upvotes + 1;
  console.log(`after: ${upvotes}`);

  dispatch({ type: 'UPVOTE_CACHE', postId, upvotes });
};
