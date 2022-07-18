import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import ProfilePicSelectIcon from '../../assets/choose-profile-pic.png';

import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { options } from '../../utils/options';

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
import { signUp } from '../../redux/action/auth';
import { RootStackParamList } from '../App';
import { SignupPayload } from '../../types';
import Snackbar from 'react-native-snackbar';

type SignUpProps = LinkDispatchProps &
  NativeStackScreenProps<RootStackParamList>;

const SignUp = ({ navigation, signUp }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<ImagePickerResponse | null>(null);

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
        setImage(response);
      }
    });
  };

  const doSignUp = () => {
    if (!name || !instaUserName || !bio || !country || !email || !password) {
      return Snackbar.show({
        text: 'Please add all fields',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }

    signUp(
      {
        name,
        instaUserName,
        bio,
        country,
        email,
        password,
        image,
      },
      navigation
    );
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail
                large
                source={
                  image
                    ? { uri: `data:${image.type};base64,${image.data}` }
                    : ProfilePicSelectIcon
                }
              />
            </TouchableOpacity>
            {!image ? (
              <Text style={styles.whiteText}>
                (optional) please choose a profile picture
              </Text>
            ) : (
              <Text style={styles.whiteText}>
                Tap on image to select a different one
              </Text>
            )}
          </View>

          <Form>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={styles.input}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={styles.input}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="instagram user name"
                value={instaUserName}
                style={styles.input}
                onChangeText={text => setInstaUserName(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="your Short Bio"
                value={bio}
                style={styles.input}
                onChangeText={text => setBio(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={styles.input}
                onChangeText={text => setCountry(text)}
              />
            </Item>
            <Button rounded block onPress={doSignUp}>
              <Text style={styles.whiteText}>Sign Up</Text>
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              // style={styles.signUpTextContainer}
            >
              <Text style={styles.signInText}>
                Already have an account, SignIn here
              </Text>
            </TouchableOpacity>
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
    marginBottom: 16,
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
  whiteText: {
    color: '#eee',
  },
  signInText: {
    color: '#eee',
    textAlign: 'center',
    marginTop: 8,
  },
});
