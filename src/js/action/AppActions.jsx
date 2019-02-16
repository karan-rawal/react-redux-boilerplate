import axios from 'axios';
import ApiEndpoints from '../constant/api-endpoints';
import actions from '../constant/actions';

export const setTextData = ({
  isLoading,
  data,
  error,
}) => ({
  type: actions.SET_TEXT_DATA,
  payload: {
    isLoading,
    data,
    error,
  },
});

export const fetchTextData = () => (dispatch) => {
  dispatch(setTextData({ isLoading: true }));
  return axios.get(ApiEndpoints.TEXT_DATA_API)
    .then((response) => {
      dispatch(setTextData({ isLoading: false, data: response.data }));
    })
    .catch((error) => {
      dispatch(setTextData({ isLoading: false, error }));
    });
};
