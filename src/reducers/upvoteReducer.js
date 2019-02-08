const upvoteReducer = (state = { upvoteError: null }, action) => {
  switch (action.type) {
    case 'UPVOTE':
      return state;
    case 'UPVOTE_FAILURE':
      return { ...state, upvoteError: action.err.message };
    default:
      return state;
  }
};

export default upvoteReducer;
