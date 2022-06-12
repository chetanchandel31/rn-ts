import { AppActions } from '../action/action.types';
import { AuthState } from '../types';
import authReducer from './auth';

describe('auth reducer', () => {
  it('should set loading to true', () => {
    const initialState: AuthState = {
      error: null,
      user: null,
      loading: false,
      isAuthenticated: false,
    };

    const action: AppActions = {
      type: 'SET_AUTH_LOADING',
      payload: true,
    };

    const reducedState = authReducer(initialState, action);

    expect(reducedState.loading).toBe(true);
  });

  it('should set loading to false', () => {
    const initialState: AuthState = {
      error: null,
      user: null,
      loading: true,
      isAuthenticated: false,
    };

    const action: AppActions = {
      type: 'SET_AUTH_LOADING',
      payload: false,
    };

    const reducedState = authReducer(initialState, action);

    expect(reducedState.loading).toBe(false);
  });

  it('should add user to state, while resetting error and loading', () => {
    const initialState: AuthState = {
      error: 'some error message',
      user: null,
      loading: true,
      isAuthenticated: false,
    };

    const action: AppActions = {
      type: 'SIGN_IN',
      payload: {
        _id: 'some_dummy_id',
        bio: 'testing auth reducer',
        country: 'konohoa',
        email: 'user@user.com',
        instaUserName: 'coolUser',
        name: 'user',
      },
    };

    const reducedState = authReducer(initialState, action);

    expect(reducedState).toEqual({
      error: null,
      user: {
        _id: 'some_dummy_id',
        bio: 'testing auth reducer',
        country: 'konohoa',
        email: 'user@user.com',
        instaUserName: 'coolUser',
        name: 'user',
      },
      loading: false,
      isAuthenticated: true,
    });
  });

  it('should remove user from state, while resetting error and loading', () => {
    const initialState: AuthState = {
      error: 'some error message',
      user: {
        _id: 'some_dummy_id',
        bio: 'testing auth reducer',
        country: 'konohoa',
        email: 'user@user.com',
        instaUserName: 'coolUser',
        name: 'user',
      },
      loading: true,
      isAuthenticated: true,
    };

    const action: AppActions = {
      type: 'SIGN_OUT',
    };

    const reducedState = authReducer(initialState, action);

    expect(reducedState).toEqual({
      error: null,
      user: null,
      loading: false,
      isAuthenticated: false,
    });
  });

  it('should set error, stop loading and clear user', () => {
    const initialState: AuthState = {
      error: null,
      user: {
        _id: 'some_dummy_id',
        bio: 'testing auth reducer',
        country: 'konohoa',
        email: 'user@user.com',
        instaUserName: 'coolUser',
        name: 'user',
      },
      loading: true,
      isAuthenticated: true,
    };

    const action: AppActions = {
      type: 'SET_AUTH_ERROR',
      payload: 'network req failed',
    };

    const reducedState = authReducer(initialState, action);

    expect(reducedState).toEqual({
      error: 'network req failed',
      user: null,
      loading: false,
      isAuthenticated: false,
    });
  });
});
