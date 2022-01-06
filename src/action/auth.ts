import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import Snackbar from "react-native-snackbar";
import { SigninDetails, SignupDetails } from "../types";

// should be using async/await inside these functions

export const signUp = (data: SignupDetails) => async () => {
  console.log(data);
  const { name, instaUserName, bio, email, password, country, image } = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
      console.log("user created successfully");

      database()
        .ref("/users/" + data.user.uid)
        .set({ name, instaUserName, country, image, bio, uid: data.user.uid })
        .then(() => {
          console.log("data set success");
          Snackbar.show({
            text: "account created",
            textColor: "white",
            backgroundColor: "#1b262c",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      Snackbar.show({
        text: "Signup failed",
        textColor: "white",
        backgroundColor: "red",
      });
    });
};

export const signIn = (data: SigninDetails) => async () => {
  console.log(data);
  const { email, password } = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("signin success");
      Snackbar.show({
        text: "account signin",
        textColor: "white",
        backgroundColor: "#1b262c",
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: "signin failed",
        textColor: "white",
        backgroundColor: "red",
      });
    });
};

export const signout = () => async () => {
  try {
    await auth().signOut();

    Snackbar.show({
      text: "Signout success",
      textColor: "white",
      backgroundColor: "#1b262c",
    });
  } catch (err) {
    console.log(err);
  }
};
