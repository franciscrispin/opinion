export const addComment = (comment, postId) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;

  // add fields to comment
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
    // add comment to comments collection
    const doc = await firestore.collection('comments').add(newComment);

    // add comment id to comment document
    await firestore
      .collection('comments')
      .doc(doc.id)
      .update({
        id: doc.id,
      });

    // get previous no. of comments from posts
    // increment number of comments in post document
    const snapshot = await firestore
      .collection('posts')
      .doc(postId)
      .get();
    let comments = snapshot.data().comments + 1;

    // add comment and updated no. of comments to post document
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
