import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../action/action.types';

// export const useAppDispatch = () => useDispatch<AppDispatch>(); // recommended
// export const useAppDispatch = () => useDispatch<Dispatch<AppActions>>(); // better auto complete 🤷‍♀️
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<any, any, AppActions>>(); // come here if thunk actions fails
