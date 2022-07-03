import { Container, H1 } from 'native-base';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

// redux
import { connect } from 'react-redux';
import { getPosts } from '../action/post';

import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';
import { AppState } from '../store';
import { PostsState } from '../types';

type HomeProps = LinkDispatchProps & LinkStateProps;

const Home = (props: HomeProps) => {
  const { getPosts, postsState } = props;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (postsState.loading) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsState.posts}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => <Post item={item} />}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1 style={styles.text}>No post found</H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

interface LinkStateProps {
  postsState: PostsState;
}

interface LinkDispatchProps {
  getPosts: () => void;
}

const mapDispatchToProps: LinkDispatchProps = {
  getPosts,
};

const mapStateToProps = (state: AppState): LinkStateProps => ({
  postsState: state.post,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#eee' },
});
