import React, { useState, useEffect } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';
import { AuthState, Post as PostSchema, Votes } from '../types';

interface PostProps {
  item: PostSchema;
  userDetails: AuthState;
}

const Post = ({ item, userDetails }: PostProps) => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);

  const upVotePost = () => {
    database()
      .ref(`/posts/${item._id}/vote/${userDetails.user?._id}`)
      .set({ type: 'upvote' })
      .then(() => console.log('upvoted'));
  };

  const downVotePost = () => {
    database()
      .ref(`/posts/${item._id}/vote/${userDetails.user?._id}`)
      .set({ type: 'downvote' })
      .then(() => console.log('downvoted'));
  };

  useEffect(() => {
    if (item.vote) {
      let upVote = 0;
      let downVote = 0;

      const votes: Votes = item.vote;

      Object.values(votes).forEach(val => {
        if (val.type === 'upvote') {
          upVote += 1;
        }

        if (val.type === 'downvote') {
          downVote += 1;
        }
      });

      setUpvote(upVote);
      setDownvote(downVote);
    }
  }, [item]);

  return (
    <Card style={styles.cardContainer}>
      <CardItem style={styles.cardHeader}>
        <Left>
          <Thumbnail source={{ uri: item.userImage }} small />
          <Body>
            <Text style={styles.userName}>{item.by}</Text>

            <Text note>{item.location}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{ uri: item.picture }} style={styles.image} />
      </CardItem>
      <CardItem cardBody style={styles.cardDescription}>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </CardItem>

      <CardItem style={styles.cardFooter}>
        <Left>
          <Button transparent onPress={upVotePost}>
            <Icon name="thumbs-up" type="Entypo" style={styles.upvoteIcon} />
            <Text style={styles.upvoteText}>{upvote}</Text>
          </Button>
          <Button transparent onPress={downVotePost}>
            <Icon
              name="thumbs-down"
              type="Entypo"
              style={styles.downvoteIcon}
            />
            <Text style={styles.downvoteText}>{downvote}</Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            iconLeft
            onPress={() => {
              Linking.openURL(`instagram://user?username=${item.instaId}`);
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
