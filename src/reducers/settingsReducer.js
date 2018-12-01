import { ALLOW_REGISTRATION } from '../actions/types';
// Initial state comes from the store.js file
// const initialState = { allowRegistration: false };

export default function (state = {}, action) {
  switch (action.type) {
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload,
      };
    default:
      return state;
  }
}
