import { API_BASE_URL } from '@env';
import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { votePost } from '../../redux/action/post';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppState } from '../../redux/store/store';
import { Post as PostSchema } from '../../types';

interface PostProps {
  item: PostSchema;
  selectPostId: (postId: string) => void;
}

const Post = ({ item, selectPostId }: PostProps) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  return (
    <Card style={styles.cardContainer}>
      <CardItem style={styles.cardHeader}>
        <Left>
          <Thumbnail
            source={{ uri: `${API_BASE_URL}/users/${item.user._id}/image` }}
            small
          />
          <Body>
            <Text style={styles.userName}>{item.user.name}</Text>

            <Text note>{item.location}</Text>
          </Body>
        </Left>

        {user?._id && user?._id === item.user._id && (
          <Right>
            <Button transparent onPress={() => selectPostId(item._id)}>
              <Icon
                name="dots-three-vertical"
                type="Entypo"
                style={styles.upvoteIcon}
              />
            </Button>
          </Right>
        )}
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: `${API_BASE_URL}/posts/${item._id}/image` }}
          style={styles.image}
        />
      </CardItem>
      <CardItem cardBody style={styles.cardDescription}>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </CardItem>

      <CardItem style={styles.cardFooter}>
        <Left>
          <Button
            transparent
            onPress={() =>
              dispatch(votePost({ id: item._id, voteType: 'upvote' }))
            }
          >
            <Icon name="thumbs-up" type="Entypo" style={styles.upvoteIcon} />
            <Text style={styles.upvoteText}>{item.upvotes?.length}</Text>
          </Button>
          <Button
            transparent
            onPress={() =>
              dispatch(votePost({ id: item._id, voteType: 'downvote' }))
            }
          >
            <Icon
              name="thumbs-down"
              type="Entypo"
              style={styles.downvoteIcon}
            />
            <Text style={styles.downvoteText}>{item.downvotes?.length}</Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            iconLeft
            onPress={() => {
              Linking.openURL(
                `instagram://user?username=${user?.instaUserName}`
              );
            }}
          >
            <Text style={styles.openIn}>Open in</Text>
            <Icon
              name="instagram"
              type="Feather"
              style={styles.instagramIcon}
            />
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: '#0f4c75', borderColor: '#0f4c75' },
  cardHeader: { backgroundColor: 'transparent' },
  userName: { color: '#fdcb9e' },
  image: { height: 200, width: undefined, flex: 1 },
  cardDescription: { backgroundColor: 'transparent', marginHorizontal: 10 },
  description: { color: '#fff' },
  cardFooter: { backgroundColor: '#0f4c75' },
  upvoteIcon: { fontSize: 20, color: '#fdcb9e' },
  upvoteText: { color: '#fdcb9e' },
  downvoteIcon: { fontSize: 20, color: '#fdcb9e' },
  downvoteText: { color: '#fdcb9e' },
  openIn: { color: '#fdcb9e' },
  instagramIcon: { fontSize: 20, color: '#fdcb9e' },
});

export default Post;
