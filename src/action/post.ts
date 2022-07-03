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

export const votePost = ({
  id,
  voteType,
}: {
  id: string;
  voteType: 'upvote' | 'downvote';
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: 'SET_POSTS_LOADING', payload: true });

      const { data }: { data: Post } = await API.post(
        `/posts/${id}/${voteType}`
      );

      dispatch({ type: 'UPDATE_POST', payload: data });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };
};
