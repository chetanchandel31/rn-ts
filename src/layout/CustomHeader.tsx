import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Body, Button, Header, Icon, Right, Text, Title } from 'native-base';

import { connect } from 'react-redux';
import { signout } from '../action/auth';
import { AppState } from '../store';
import { AuthState } from '../types';
import { StyleSheet } from 'react-native';

interface CustomHeaderOwnProps {
  dummyProp?: string; // own props: not coming from redux, navigation etc.
}

type CustomHeaderProps = CustomHeaderOwnProps &
  LinkStateProps &
  LinkDispatchProps &
  NativeStackHeaderProps;

const CustomHeader = (props: CustomHeaderProps) => {
  const { navigation, signout, authState } = props;

  return (
    <Header androidStatusBarColor="#0f4c75" style={styles.header}>
      <Body>
        <Title>Social Media</Title>
      </Body>

      <Right>
        {authState.isAuthenticated && (
          <>
            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('AddPost')}
            >
              <Text style={styles.addPostText}>Add Post</Text>
            </Button>

            <Button transparent onPress={() => signout()}>
              <Icon name="log-out-outline" style={styles.signoutIcon} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: { backgroundColor: '#0f4c75' },
  addPostText: { color: '#fdcb9e' },
  signoutIcon: { color: 'red' },
});

interface LinkStateProps {
  authState: AuthState;
}

interface LinkDispatchProps {
  signout: () => void; // more things might be needed here
}

const mapStateToProps = (
  state: AppState,
  _ownProps: CustomHeaderOwnProps
): LinkStateProps => ({
  authState: state.auth,
});

const mapDispatchToProps: LinkDispatchProps = {
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
