import { useEffect, useState } from 'react';

import * as SecureStore from 'expo-secure-store';

const useUserData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const getUserSession = async () => {
      const name = await SecureStore.getItemAsync('name');
      const email = await SecureStore.getItemAsync('email');
      const avatar = await SecureStore.getItemAsync('avatar');

      setName(name!);
      setEmail(email!);
      setAvatar(avatar!);
    };

    getUserSession();
  }, []);

  return { name, email, avatar };
};

export default useUserData;
