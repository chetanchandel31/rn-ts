import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  H3,
  Textarea,
  Icon,
} from "native-base";

import Snackbar from "react-native-snackbar";
import { Bar } from "react-native-progress";

import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

import ImagePicker from "react-native-image-picker";
import { options } from "../utils/options";

const AddPost = ({ navigation, userState }: any) => {
  return <Text>hello from add post</Text>;
};

export default AddPost;
