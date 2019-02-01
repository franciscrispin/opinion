import { combineReducers } from 'redux';

const addPostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('add post');
      console.log(action.post);
      // get state from action creator when adding post to firestore
      // console.log({
      //   ...action.post,
      //   tags: Object.values(state).filter((id) => id !== ''),
      // });
      return state;
    default:
      return state;
  }
};

const addPostTagsReducer = (state = {}, action) => {
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
  newPost: addPostReducer,
  newPostTags: addPostTagsReducer,
});

export default newPostReducer;
