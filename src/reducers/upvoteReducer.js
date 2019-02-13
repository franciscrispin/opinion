const upvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPVOTE':
      return state;
    case 'UPVOTE_FAILURE':
      return state;
    case 'TOGGLE_UPVOTE':
      return {
        ...state,
        [action.postId]: {
          upvotes: state[action.postId].isActive
            ? state[action.postId].upvotes - 1
            : state[action.postId].upvotes + 1,
          isActive: !state[action.postId].isActive,
        },
      };
    case 'SET_UPVOTE_STATE':
      return { ...state, ...action.upvoteState };
    default:
      return state;
  }
};

export default upvoteReducer;
