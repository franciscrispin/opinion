import { combineReducers } from 'redux';

// set the is upvoted status and the no. of upvotes for each post
const upvoteReducer = (state = {}, action) => {
  switch (action.type) {
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

// set the status of whether the no. of upvotes in the database are updated
const updateUpvoteReducer = (state = true, action) => {
  switch (action.type) {
    case 'UPVOTE_REQUEST':
      return false;
    case 'UPVOTE_SUCCESS':
    case 'UPVOTE_FAILURE':
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  upvoteState: upvoteReducer,
  isUpdated: updateUpvoteReducer,
});
