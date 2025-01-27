import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { User } from '@/types';

export const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoader(true);
    try {
      await setAuthorizationHeader();
      const { data } = await axios.get('me');

      await SecureStore.setItemAsync('name', data.user.name);
      await SecureStore.setItemAsync('email', data.user.email);
      await SecureStore.setItemAsync('avatar', data.user.avatar);

      setUser(data.user);
    } catch (error) {
      console.error('Error while fetching user data', error);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();

    return () => setShouldRefetch(false);
  }, [fetchUserData, setShouldRefetch]);

  const refetch = () => {
    setShouldRefetch(true);
  };

  return { user, loader, refetch };
};
