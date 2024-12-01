import { useEffect, useState } from 'react';

import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      const token = SecureStore.getItem('accessToken');

      setLoading(false);
      setLoggedInUser(token ? true : false);
    };

    subscription();
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Redirect href={!loggedInUser ? '/(routes)/onboarding' : '/(tabs)'} />
      )}
    </>
  );
};

export default Page;
