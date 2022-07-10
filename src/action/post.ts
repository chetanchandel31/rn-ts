import { ImagePickerResponse } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
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
      Snackbar.show({
        text: 'failed to list posts',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };
};

export const createPost = ({
  description,
  location,
  image,
  onCreate,
}: {
  description: string;
  image: ImagePickerResponse;
  location: string;
  onCreate?: () => void;
}) => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    try {
      const { data }: { data: Post } = await API.post('/posts', {
        description,
        location,
        image,
      });

      dispatch({ type: 'CREATE_POST', payload: data });

      onCreate && onCreate();

      Snackbar.show({
        text: 'Added new post',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    } catch (error) {
      Snackbar.show({
        text: 'Post upload failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
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
      Snackbar.show({
        text: 'failed to update post',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };
};
