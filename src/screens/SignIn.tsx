import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Container, H3, Form, Item, Input, Button } from 'native-base';

import Welcome from '../assets/welcome.png';

import { connect } from 'react-redux';
import { signIn } from '../action/auth';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { SigninDetails } from '../types';
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
        textColor: 'white',
        backgroundColor: 'red',
      });
    }

    signIn({ email, password });
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <H3 style={styles.heading}>Welcome to the Social App</H3>

        <Image
          source={Welcome}
          style={{
            width: undefined,
            height: 150,
            marginTop: 30,
          }}
          resizeMode="contain"
        />

        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd email"
              value={email}
              style={{ color: '#eee' }}
              onChangeText={text => setEmail(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd password"
              value={password}
              secureTextEntry={true}
              style={{ color: '#eee' }}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Button rounded block onPress={() => doSignIn({ email, password })}>
            <Text>Sign In</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
  );
};

interface LinkDispatchProps {
  signIn: (data: SigninDetails) => void;
}

const mapDispatchToProps: LinkDispatchProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#fdcb9e',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginBottom: 20,
  },
});
