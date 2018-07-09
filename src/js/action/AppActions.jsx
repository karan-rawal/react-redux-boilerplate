import axios from 'axios';
import Actions from '.';
import ApiEndpoints from '../constant/api-endpoints';

export const setPostsStatus = ({ isFetching, error }) => ({
  type: Actions.ACTION_SET_POSTS_STATUS,
  payload: {
    isFetchingPosts: isFetching,
    error,
  },
});

export const setPosts = ({ posts }) => ({
  type: Actions.ACTION_SET_POSTS,
  payload: {
    posts,
  },
});

export const getPosts = () => (dispatch) => {
  dispatch(setPostsStatus({ isFetching: true, error: null }));
  return axios.get(ApiEndpoints.getPosts)
    .then((response) => {
      dispatch(setPostsStatus({ isFetching: false, error: null }));
      dispatch(setPosts({ posts: response.data }));
    }).catch((error) => {
      dispatch(setPostsStatus({ isFetching: false, error }));
    });
};
