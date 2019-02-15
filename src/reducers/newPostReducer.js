import { combineReducers } from 'redux';

const postReducer = (state = { postError: null }, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return { ...state, postError: null };
    case 'ADD_POST_FAILURE':
      return { ...state, postError: action.err.message };
    default:
      return state;
  }
};

// set the state of the chips selected for the new post
const chipReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CHIP':
      return { ...state, [action.chip.chipId]: action.chip.topicId };
    case 'CLEAR_CHIPS':
      return { ...state, ...action.newChips };
    default:
      return state;
  }
};

const newPostReducer = combineReducers({
  newPost: postReducer,
  newPostChips: chipReducer,
});

export default newPostReducer;
