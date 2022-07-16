import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import EmptyContainer from './components/EmptyContainer';
import CustomHeader from './layout/CustomHeader';
import { requestPermission } from '../utils/askPermission';
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import AddPost from './screens/AddPost';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
// redux
import { connect } from 'react-redux';
// firebase
import { SIGN_IN, SIGN_OUT } from '../redux/action/action.types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { AppState } from '../redux/store/store';
import { AuthState, User } from '../types';

export type RootStackParamList = {
  Home: undefined;
  AddPost: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppProps {
  authState: AuthState;
}

const App = ({ authState }: AppProps) => {
  const dispatch = useAppDispatch();
  // const reduxState = useSelector(state => state);
  // console.log(reduxState, 'redux state');

  useEffect(() => {
    const setUserFromAsyncStorage = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('@USER');
        const user = typeof storedValue === 'string' && JSON.parse(storedValue);
        // console.log(user, 'USER'); // TODO: remove

        if (user) {
          dispatch({ type: SIGN_IN, payload: user.user as User });
        } else {
          dispatch({ type: SIGN_OUT });
        }
      } catch (error) {
        console.log("couldn't read from async storage");
      }
    };

    requestPermission();
    setUserFromAsyncStorage();
  }, [dispatch]);

  if (authState?.loading) {
    return <EmptyContainer />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: props => {
              return <CustomHeader {...props} />;
            },
          }}
        >
          {authState?.isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddPost" component={AddPost} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);
