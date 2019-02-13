export const addComment = (comment, postId) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  const newComment = {
    postId,
    authorId,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    initials: profile.initials,
    description: comment,
    createdAt: new Date(),
    upvotes: 0,
  };

  try {
    // add comment to comment collection
    const doc = await firestore.collection('comments').add(newComment);

    // add comment id to comment collection
    await firestore
      .collection('comments')
      .doc(doc.id)
      .update({
        id: doc.id,
      });

    // increment number of comments
    const snapshot = await firestore
      .collection('posts')
      .doc(postId)
      .get();
    let comments = snapshot.data().comments + 1;

    // add new comment and comment id to post
    await firestore
      .collection('posts')
      .doc(postId)
      .update({
        comments,
        commentList: firestore.FieldValue.arrayUnion({
          ...newComment,
          id: doc.id,
        }),
      });

    dispatch({ type: 'ADD_COMMENT' });
  } catch (err) {
    dispatch({ type: 'ADD_COMMENT_FAILURE', err });
  }
};
