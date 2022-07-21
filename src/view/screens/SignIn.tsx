import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Container, H3, Form, Item, Input, Button } from 'native-base';

import Welcome from '../../assets/welcome.png';

import { connect } from 'react-redux';
import { signIn } from '../../redux/action/auth';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Colors, SigninPayload } from '../../types';
import Snackbar from 'react-native-snackbar';

type SignInProps = NativeStackScreenProps<RootStackParamList> &
  LinkDispatchProps;

const SignIn = ({ navigation, signIn }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!email || !password) {
      return Snackbar.show({
        text: 'Please add all fields',
        textColor: Colors.White,
        backgroundColor: 'red',
      });
    }

    signIn({ email, password });
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <H3 style={styles.heading}>Welcome to the Social App</H3>

        <Image source={Welcome} style={styles.image} resizeMode="contain" />

        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd email"
              value={email}
              style={styles.input}
              onChangeText={text => setEmail(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd password"
              value={password}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Button rounded block onPress={() => doSignIn({ email, password })}>
            <Text>Sign In</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signUpTextContainer}
          >
            <Text style={styles.signUpText}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
  );
};

interface LinkDispatchProps {
  signIn: (data: SigninPayload) => void;
}

const mapDispatchToProps: LinkDispatchProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BackgroundColor,
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: Colors.TextColor,
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    width: undefined,
    height: 150,
    marginTop: 30,
  },
  input: {
    color: Colors.White,
  },
  signUpTextContainer: {
    marginTop: 10,
  },
  signUpText: {
    color: Colors.White,
    textAlign: 'center',
  },
});
