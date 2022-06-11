import { Dispatch } from 'redux';
import { API } from '../api';
import { AppState } from '../store';
import { Post } from '../types';
import { AppActions, ERROR_POST } from './action.types';

export const getPosts = () => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    try {
      const { data }: { data: Post[] } = await API.get('/posts');

      dispatch({ type: 'GET_POSTS', payload: data });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };
};
