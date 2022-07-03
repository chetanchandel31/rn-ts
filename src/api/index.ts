import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use(async req => {
  const storedValue = await AsyncStorage.getItem('@USER');
  const user = typeof storedValue === 'string' && JSON.parse(storedValue);

  // before each request, add auth token to header
  if (user && req.headers) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});
