import React, { useEffect } from "react";
import { Text } from "react-native";
import CustomHeader from "./layout/CustomHeader";
import EmptyContainer from "./components/EmptyContainer";
import { requestPermission } from "./utils/askPermission";
// react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
import AddPost from "./screens/AddPost";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
// redux
import { connect } from "react-redux";
import { SET_USER, IS_AUTHENTICATED } from "./action/action.types";
import { useAppDispatch } from "./hooks/useAppDispatch";
// firebase
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
import { AuthState } from "./types";
import { AppState } from "./store";

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

  const onAuthStateChanged = (user: any) => {
    if (user) {
      dispatch({ type: IS_AUTHENTICATED, payload: true });

      console.log(user._user.uid);

      database()
        .ref(`/users/${user._user.uid}`)
        .on("value", (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
          console.log("USER DETAILS", snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({ type: IS_AUTHENTICATED, payload: false });
    }
  };

  useEffect(() => {
    requestPermission();
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => unsubscribe();
  }, []);

  if (authState?.loading) return <EmptyContainer />;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => {
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
