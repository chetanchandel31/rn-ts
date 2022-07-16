import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../redux/action/action.types';
import { AppState } from '../redux/store/store';

// export const useAppDispatch = () => useDispatch<AppDispatch>(); // recommended
// export const useAppDispatch = () => useDispatch<Dispatch<AppActions>>(); // better auto complete 🤷‍♀️
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<AppState, any, AppActions>>(); // come here if thunk actions fails
