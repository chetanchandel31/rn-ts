import { Container, Spinner } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../types';

const EmptyContainer = () => {
  return (
    <Container style={styles.emptyContainer}>
      <Spinner />
    </Container>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
