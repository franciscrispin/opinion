export const upvoteReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPVOTE':
      console.log('upvoted post');
      return state;
    case 'UPVOTE_FAILURE':
      console.log('upvote failed');
      return state;
    default:
      return state;
  }
};

export const fetchUpvotesReducer = (
  state = { upvotes: [], upvoteError: null },
  action
) => {
  switch (action.type) {
    case 'FETCH_UPVOTES_SUCCESS':
      console.log('fetch upvotes success');
      return {
        upvotes: [...state.upvotes, ...action.upvotes],
        upvoteError: null,
      };
    case 'FETCH_UPVOTES_FAILURE':
      console.log('fetch upvotes failure');
      console.log(action.err.message);
      return { upvotes: [...state.upvotes], upvoteError: action.err.message };
    case 'UPVOTE_CACHE':
      console.log('upvote cache');
      return {
        upvotes: [
          ...state.upvotes.filter((p) => p.id !== action.postId),
          { id: action.postId, upvotes: action.upvotes },
        ],
        upvoteError: null,
      };
    default:
      return state;
  }
};
