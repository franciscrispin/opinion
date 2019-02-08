const commentReducer = (state = { commentError: null }, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return state;
    case 'ADD_COMMENT_FAILURE':
      return { ...state, commentError: action.err.message };
    default:
      return state;
  }
};

export default commentReducer;
