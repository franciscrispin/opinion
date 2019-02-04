const commentReducer = (state = { commentError: null }, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      console.log('add comment');
      return state;
    case 'ADD_COMMENT_FAILURE':
      console.log('add comment failure');
      return { ...state, commentError: action.err.message };
    default:
      return state;
  }
};

export default commentReducer;
