import React from 'react';
import { ScrollView } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/theme.context';
import HomeBanner from '@/components/home/HomeBanner';
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

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <HomeBanner />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default Home;
