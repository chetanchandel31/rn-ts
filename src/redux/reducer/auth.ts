import {
  AuthActionTypes,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  SIGN_IN,
  SIGN_OUT,
} from '../action/action.types';
import { AuthState } from '../../types';

const initialState: AuthState = {
  error: null,
  user: null,
  loading: true,
  isAuthenticated: false,
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case SIGN_OUT:
      return {
        ...state,
        error: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};
