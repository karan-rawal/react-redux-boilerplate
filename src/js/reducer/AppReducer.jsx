import _ from 'lodash';
import Actions from '../action';

const initialState = {
  isFetchingPosts: false,
  posts: [],
  error: null,
};

const AppReducer = (state = initialState, action) => {
  let tempState = _.assign({}, state);

  switch (action.type) {
    case Actions.ACTION_SET_POSTS_STATUS:
      tempState.isFetchingPosts = action.payload.isFetchingPosts;
      tempState.error = action.payload.error;
      break;
    case Actions.ACTION_SET_POSTS:
      tempState.posts = action.payload.posts;
      break;
    default:
      tempState = _.assign({}, state);
  }
  return tempState;
};

export default AppReducer;
