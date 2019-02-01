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
  dispatch({ type: 'LOGOUT_SUCCESS' });
};

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
    await firestore
      .collection('users')
      .doc(response.user.uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
      });
    dispatch({ type: 'SIGNUP_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGNUP_FAILURE', err });
  }
};
