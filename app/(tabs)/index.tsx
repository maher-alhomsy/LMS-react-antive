import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/theme.context';
import WelcomeHeader from '@/components/home/WelcomeHeader';

const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <LinearGradient
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}
        colors={
          theme.dark ? ['#180d41', '#2A2D32', '#131313'] : ['#fff', '#f7f7f7']
        }
      >
        <WelcomeHeader />
      </LinearGradient>
    </>
  );
};

export default Home;
