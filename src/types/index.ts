export interface Post {
  description: string;
  location: string;
  picture: string;
  date: number;
  instaId: string;
  userImage: string;
  _id: string;
  // vote?: { upvote: boolean } | { downvote: boolean };
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
  image: string;
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
