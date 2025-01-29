import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/context/theme.context';
import HomeBanner from '@/components/home/HomeBanner';
import WelcomeHeader from '@/components/home/WelcomeHeader';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import { verticalScale } from 'react-native-size-matters';
import GradientText from '@/components/common/GradientText';

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
          <View
            style={{
              marginTop: verticalScale(-25),
              marginHorizontal: windowWidth(20),
            }}
          >
            <View style={{ flexDirection: 'row', marginTop: windowHeight(5) }}>
              <Text
                style={{
                  fontSize: fontSizes.FONT35,
                  fontFamily: 'Poppins_500Medium',
                  color: theme.dark ? '#fff' : '#000',
                }}
              >
                Popular
              </Text>

              <GradientText
                text=" Courses"
                styles={{
                  fontSize: fontSizes.FONT35,
                  fontFamily: 'Poppins_500Medium',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default Home;
