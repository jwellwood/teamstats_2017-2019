import { CLEAR_RESULT_FORM } from '../actions/types';

const initialState = {
  result: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_RESULT_FORM:
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
}
