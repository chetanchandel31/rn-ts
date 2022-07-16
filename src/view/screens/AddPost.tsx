import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Textarea,
  Icon,
} from 'native-base';

import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { options } from '../../utils/options';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Snackbar from 'react-native-snackbar';
import { User } from '../../types';
import { createPost } from '../../redux/action/post';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import EmptyContainer from '../components/EmptyContainer';

type AddPostProps = LinkStateProps & NativeStackScreenProps<RootStackParamList>;

const AddPost = ({ navigation }: AddPostProps) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAddPostLoading, setIsAddPostLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImagePickerResponse | null>(null);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      // note: response.data is a base64 string, we can convert it to Buffer at backend(which will be stored in mongodb)

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

  const addPost = () => {
    if (!location || !description || !image) {
      return Snackbar.show({
        text: 'Please add all fields',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }

    setIsAddPostLoading(true);
    dispatch(
      createPost({
        description,
        location,
        image,
        onCreate: () => {
          setIsAddPostLoading(false);
          navigation.navigate('Home');
        },
      })
    );
  };

  if (isAddPostLoading) {
    return <EmptyContainer />;
  }

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="location"
                value={location}
                style={styles.textArea}
                onChangeText={text => setLocation(text)}
              />
            </Item>

            {image && (
              <Image
                source={{ uri: `data:${image.type};base64,${image.data}` }}
                style={styles.image}
                resizeMode="center"
              />
            )}

            <Button
              // regular
              bordered
              block
              iconLeft
              info
              style={styles.formItem}
              onPress={chooseImage}
            >
              <Icon
                name="md-image-outline"
                type="Ionicons"
                style={styles.icon}
              />
              <Text style={styles.chooseImgBtn}>Choose Image</Text>
            </Button>

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={styles.textArea}
                onChangeText={text => setDescription(text)}
              />
            </Item>

            <Button block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

interface LinkStateProps {
  userState: User | null;
}

export default AddPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: { marginBottom: 20 },
  icon: { fontSize: 20, color: '#fdcb9e' },
  image: { width: undefined, height: 150, marginVertical: 15 },
  progress: { width: undefined, marginBottom: 20 },
  textArea: { color: '#eee' },
  scrollView: { flexGrow: 1 },
  chooseImgBtn: { color: '#fdcb9e' },
});
