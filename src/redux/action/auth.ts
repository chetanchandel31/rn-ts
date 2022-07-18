import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Snackbar from 'react-native-snackbar';
import { Dispatch } from 'redux';
import { API } from '../../api';
import { RootStackParamList } from '../../view/App';
import { SigninPayload, SigninResponse, SignupPayload } from '../../types';
import {
  AuthActionTypes,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  SIGN_IN,
  SIGN_OUT,
} from './action.types';

export const signUp =
  (
    data: SignupPayload,
    navigation: NativeStackNavigationProp<RootStackParamList>
  ) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    const { name, instaUserName, bio, email, password, country, image } = data;

    dispatch({ type: SET_AUTH_LOADING, payload: true });
    try {
      await API.post('/signup', {
        email,
        password,
        name,
        instaUserName,
        bio,
        country,
        image,
      });

      dispatch({ type: SET_AUTH_LOADING, payload: false });

      navigation.navigate('SignIn');

      Snackbar.show({
        text: 'account created, please sign in',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    } catch (error: any) {
      console.log(error, 'signup failed');
      const errorMessage = error?.response?.data?.error || 'signup failed';

      Snackbar.show({
        text: errorMessage,
        textColor: 'white',
        backgroundColor: 'red',
      });
      dispatch({
        type: SET_AUTH_ERROR,
        payload: errorMessage,
      });
    }
  };

export const signIn =
  (data: SigninPayload) => async (dispatch: Dispatch<AuthActionTypes>) => {
    const { email, password } = data;

    dispatch({ type: SET_AUTH_LOADING, payload: true });

    try {
      const { data }: { data: SigninResponse } = await API.post('/signin', {
        email,
        password,
      });

      dispatch({ type: SIGN_IN, payload: data.user });

      await AsyncStorage.setItem('@USER', JSON.stringify(data));

      Snackbar.show({
        text: 'signin successful',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    } catch (error: any) {
      console.log(error, 'signin failed');
      Snackbar.show({
        text: error?.response?.data?.error || 'signin failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
      dispatch({
        type: SET_AUTH_ERROR,
        payload: error?.response?.data?.error || 'signin failed',
      });
    }
  };

export const signout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    await AsyncStorage.removeItem('@USER');
    dispatch({ type: SIGN_OUT });

    Snackbar.show({
      text: 'Signout success',
      textColor: 'white',
      backgroundColor: '#1b262c',
    });
  } catch (err) {
    console.log(err);
  }
};
