export const login = (credentials, firebase) => async (dispatch) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    dispatch({ type: 'LOGIN_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', err });
  }
};

export const logout = (firebase) => async (dispatch) => {
  await firebase.auth().signOut();
  dispatch({ type: 'LOGOUT' });
};

const capitalize = (name) =>
  name[0].toUpperCase() + name.slice(1).toLowerCase();

export const signup = (newUser, firebase) => async (
  dispatch,
  getState,
  getFirestore
) => {
  const firestore = getFirestore();

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    const firstName = capitalize(newUser.firstName);
    const lastName = capitalize(newUser.lastName);
    const initials = firstName[0] + lastName[0];

    await firestore
      .collection('users')
      .doc(response.user.uid)
      .set({
        firstName,
        lastName,
        initials,
        posts: [],
        upvoted: [],
      });
    dispatch({ type: 'SIGNUP_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGNUP_FAILURE', err });
  }
};
