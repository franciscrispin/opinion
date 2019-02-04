import { combineReducers } from 'redux';

const postReducer = (state = { postError: null }, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('add post');
      console.log(action.post);
      return { ...state, postError: null };
    case 'ADD_POST_FAILURE':
      console.log('add post failure');
      return { ...state, postError: action.err.message };
    default:
      return state;
  }
};

const tagsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TAG':
      console.log('add tag');
      console.log({ ...state, [action.tag.chipId]: action.tag.topicId });
      return { ...state, [action.tag.chipId]: action.tag.topicId };
    case 'CLEAR_TAGS':
      console.log('clear tags');
      return { ...state, ...action.newTags };
    default:
      return state;
  }
};

const newPostReducer = combineReducers({
  newPost: postReducer,
  newPostTags: tagsReducer,
});

export default newPostReducer;
