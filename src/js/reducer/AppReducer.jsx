/* eslint-disable default-case */
import { assign } from 'lodash';
import actions from '../constant/actions';

const initialState = {
  textData: {
    isLoading: true,
    data: undefined,
    error: undefined,
  },
};

const AppReducer = (state = initialState, action) => {
  const tempState = assign({}, state);
  switch (action.type) {
    case actions.SET_TEXT_DATA:
      tempState.textData = assign({}, action.payload);
      break;
  }
  return tempState;
};

export default AppReducer;
