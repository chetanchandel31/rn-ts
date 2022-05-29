import { IS_AUTHENTICATED, SET_USER } from '../action/action.types';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

export default (state = initialState, action: any): AuthState => {
  // TODO: auth action types once we know more about SET_USER
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
