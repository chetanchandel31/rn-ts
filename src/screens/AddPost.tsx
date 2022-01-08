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

import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import { options } from "../utils/options";
import { AppState } from "../store";
import { connect } from "react-redux";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const AddPost = ({ navigation, userState }: any) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<boolean | number>(false);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async (response: ImagePickerResponse) => {
    setImageUploading(true);
    const reference = storage().ref(`${response.fileName}-${Date.now()}`);

    if (!response.path) return console.log("😭");

    const task = reference.putFile(response.path); // apparently .path is the image file itself?
    task.on("state_changed", (taskSnapshot) => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;

      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const addPost = async () => {};

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="center"
            />
          ) : null}
          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="location"
                value={location}
                style={{ color: "#eee" }}
                onChangeText={(text) => setLocation(text)}
              />
            </Item>

            {imageUploading && typeof uploadStatus === "number" ? (
              <Bar progress={uploadStatus} style={styles.progress} />
            ) : (
              <Button
                // regular
                bordered
                block
                iconLeft
                info
                style={styles.formItem}
                onPress={chooseImage}
              >
                <Icon
                  name="md-image-outline"
                  type="Ionicons"
                  style={styles.icon}
                />
                <Text
                  style={{
                    color: "#fdcb9e",
                  }}
                >
                  Choose Image
                </Text>
              </Button>
            )}

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={{ color: "#eee" }}
                onChangeText={(text) => setDescription(text)}
              />
            </Item>

            <Button block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

interface LinkStateProps {
  userState: FirebaseAuthTypes.User;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userState: state.auth.user,
});

export default connect(mapStateToProps)(AddPost);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b262c",
    flex: 1,
    justifyContent: "flex-start",
  },
  formItem: {
    marginBottom: 20,
  },
  icon: { fontSize: 20, color: "#fdcb9e" },
  image: { width: undefined, height: 150, marginVertical: 15 },
  progress: { width: undefined, marginBottom: 20 },
});
