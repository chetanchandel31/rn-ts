import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import storage from '@react-native-firebase/storage';
import { Bar } from 'react-native-progress';

import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { options } from '../utils/options';

// redux
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Thumbnail,
  View,
} from 'native-base';
import { connect } from 'react-redux';
import { signUp } from '../action/auth';
import { RootStackParamList } from '../App';
import { SignupPayload } from '../types';

type SignUpProps = LinkDispatchProps &
  NativeStackScreenProps<RootStackParamList>;

const SignUp = ({ navigation, signUp }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png'
  );

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

  const doSignUp = () => {
    signUp(
      { name, instaUserName, bio, country, email, password, image },
      navigation
    );
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{ uri: image }} />
            </TouchableOpacity>
          </View>

          {imageUploading && typeof uploadStatus === 'number' && (
            <Bar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={styles.input}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={styles.input}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instaUserName}
                style={styles.input}
                onChangeText={text => setInstaUserName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={styles.input}
                onChangeText={text => setBio(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={styles.input}
                onChangeText={text => setCountry(text)}
              />
            </Item>
            <Button
              //  regular // TODO: check
              block
              onPress={doSignUp}
            >
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

interface LinkDispatchProps {
  signUp: (
    data: SignupPayload,
    navigation: NativeStackNavigationProp<RootStackParamList>
  ) => void;
}

const mapDispatchToProps: LinkDispatchProps = {
  signUp: (data, navigation) => signUp(data, navigation),
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {
    // width: null,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  input: {
    color: '#eee',
  },
});
