export interface Post {
  description: string;
  location: string;
  picture: string;
  by: string;
  date: number;
  instaId: string;
  userImage: string;
}

// schema for user object that we store in db is different from firebase's default user object's schema
export interface UserDetails {
  name: string;
  instaUserName: string;
  bio: string;
  email: string;
  password: string;
  country: string;
  image: string;
}

// store
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: null | UserDetails; // TODO: change
}

// auth
export type SignupDetails = UserDetails;

export type SigninDetails = {
  email: string;
  password: string;
};
