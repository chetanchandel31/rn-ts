import { Container, H1 } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// redux
import { connect } from 'react-redux';
import { deletePost, getPosts } from '../action/post';

import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { AppState } from '../store';
import { PostsState } from '../types';

type HomeProps = LinkDispatchProps & LinkStateProps;

const Home = (props: HomeProps) => {
  const { getPosts, postsState } = props;
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectPostId = (postId: string) => setSelectedPostId(postId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePost = () =>
    selectedPostId &&
    dispatch(
      deletePost({
        id: selectedPostId,
        onDelete: () => setSelectedPostId(null),
      })
    );

  if (postsState.loading) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsState.posts}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => (
          <Post item={item} selectPostId={selectPostId} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1 style={styles.text}>No post found</H1>
          </Container>
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={selectedPostId !== null}
      >
        <View style={styles.modalOuterView}>
          <View style={styles.modalInnerView}>
            <Text style={styles.modalText}>What would you like to do?</Text>
            <Button
              color="red"
              onPress={handleDeletePost}
              title="Delete post"
            />
            <TouchableOpacity onPress={() => setSelectedPostId(null)}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOuterView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerView: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 6,
    padding: 16,
  },
  modalText: { marginVertical: 16, textAlign: 'center' },
  cancelBtn: { marginVertical: 16, textAlign: 'center' },
});
