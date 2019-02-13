export const updateUpvotes = (postId, prevUpvotes) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const upvotes = getState().upvote[postId].upvotes;

  try {
    if (upvotes > prevUpvotes) {
      await firestore
        .collection('users')
        .doc(uid)
        .update({ upvoted: firestore.FieldValue.arrayUnion(postId) });
    } else if (upvotes < prevUpvotes) {
      await firestore
        .collection('users')
        .doc(uid)
        .update({ upvoted: firestore.FieldValue.arrayRemove(postId) });
    }

    await firestore
      .collection('posts')
      .doc(postId)
      .update({ upvotes });

    dispatch({ type: 'UPVOTE', postId });
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

// export const setUpvoteState = (upvoteState) => async (
//   dispatch,
//   getState,
//   getFirestore
// ) => {
//   const uid = getState().firebase.auth.uid;
//   const firestore = getFirestore();

//   try {
//     const userDoc = await firestore
//       .collection('users')
//       .doc(uid)
//       .get();
//     const userUpvotedPosts = userDoc.data().upvoted;

//     const postSnapshot = await firestore.collection('posts').get();
//     const posts = postSnapshot.docs.map((post) => post.data());
//   const upvoteState = posts
//     .map((post) => ({
//       id: post.id,
//       upvotes: post.upvotes,
//       isActive: userUpvotedPosts.some((id) => id === post.id),
//     }))
//     .reduce(upvotesReducer, {});

//     // dispatch({ type: 'SET_UPVOTE_STATE', upvoteState });
//   } catch (err) {
//     dispatch({ type: 'SET_UPVOTE_STATE_FAILURE' });
//   }
// };
