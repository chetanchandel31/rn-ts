import { ImagePickerResponse } from 'react-native-image-picker';

export interface Post {
  description: string;
  location: string;
  date: number;
  _id: string;
  upvotes?: string[];
  downvotes?: string[];
  user: User;
}

// store
export interface AuthState {
  isAuthenticated: boolean;
  error: null | string;
  loading: boolean;
  user: null | User;
}

export interface PostsState {
  posts: Post[] | null;
  loading: boolean;
  error: boolean;
}

// auth
export interface User {
  email: string;
  name: string;
  instaUserName: string;
  bio: string;
  country: string;
  _id: string;
}

export interface SignupPayload {
  name: string;
  instaUserName: string;
  bio: string;
  email: string;
  password: string;
  country: string;
  image: ImagePickerResponse | null;
}

export type SigninPayload = {
  email: string;
  password: string;
};

export interface SigninResponse {
  token: string;
  user: User;
}

export interface SignupResponse extends User {}

export enum Colors {
  BackgroundColor = '#1b262c',
  Primary = '#0f4c75',
  TextColor = '#fdcb9e',
  White = '#eee',
}
