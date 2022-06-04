export interface Post {
  description: string;
  location: string;
  picture: string;
  by: string;
  date: number;
  instaId: string;
  userImage: string;
  _id: string;
  // vote?: { upvote: boolean } | { downvote: boolean };
  vote?: Votes;
}

export interface Votes {
  [userId: string]: { type: 'upvote' | 'downvote' };
}

// schema for user object that we store in db is different from firebase's default user object's schema
export interface UserDetails extends SignupDetails {
  uid: string;
}

// store
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: null | UserDetails; // TODO: change
}

export interface PostsState {
  posts: Post[] | null;
  loading: boolean;
  error: boolean;
}

// auth
export interface SignupDetails {
  name: string;
  instaUserName: string;
  bio: string;
  email: string;
  password: string;
  country: string;
  image: string;
}

export type SigninDetails = {
  email: string;
  password: string;
};
