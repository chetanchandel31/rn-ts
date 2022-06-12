import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Textarea,
  Icon,
} from 'native-base';

import { Bar } from 'react-native-progress';
import shortid from 'shortid';

import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { options } from '../utils/options';

import { AppState } from '../store';
import { connect } from 'react-redux';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Snackbar from 'react-native-snackbar';
import { Post, User } from '../types';

type AddPostProps = LinkStateProps & NativeStackScreenProps<RootStackParamList>;

const AddPost = ({ navigation, userState }: AddPostProps) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<boolean | number>(false);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async (response: ImagePickerResponse) => {
    setImageUploading(true);
    const reference = storage().ref(`${response.fileName}-${Date.now()}`);

    if (!response.path) {
      return console.log('😭');
    }

    const task = reference.putFile(response.path); // apparently .path is the image file itself?
    task.on('state_changed', taskSnapshot => {
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

  const addPost = async () => {
    try {
      if (!location || !description || !image) {
        return Snackbar.show({
          text: 'Please add all fields',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }

      const uid = shortid.generate();

      const postData: Post = {
        location,
        description,
        picture: image,
        by: userState?.name || '',
        date: Date.now(),
        instaId: userState?.instaUserName || '',
        userImage: `api-base-url/${userState?._id}` || '',
        _id: uid,
      };
      await database().ref(`/posts/${uid}`).set(postData);

      console.log('post added SUCCESS');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Post upload failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={styles.scrollView}>
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
                style={styles.textArea}
                onChangeText={text => setLocation(text)}
              />
            </Item>

            {imageUploading && typeof uploadStatus === 'number' ? (
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
                <Text style={styles.chooseImgBtn}>Choose Image</Text>
              </Button>
            )}

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={styles.textArea}
                onChangeText={text => setDescription(text)}
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
  userState: User | null;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userState: state.auth.user,
});

export default connect(mapStateToProps)(AddPost);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: { marginBottom: 20 },
  icon: { fontSize: 20, color: '#fdcb9e' },
  image: { width: undefined, height: 150, marginVertical: 15 },
  progress: { width: undefined, marginBottom: 20 },
  textArea: { color: '#eee' },
  scrollView: { flexGrow: 1 },
  chooseImgBtn: { color: '#fdcb9e' },
});
