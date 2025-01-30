import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale } from 'react-native-size-matters';

import { useTheme } from '@/context/theme.context';
import Skeleton from '@/components/common/Skeleton';
import HomeBanner from '@/components/home/HomeBanner';
import WelcomeHeader from '@/components/home/WelcomeHeader';
import GradientText from '@/components/common/GradientText';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

const Home = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

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

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: windowHeight(50) }}
        >
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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  borderRadius: 100,
                  width: windowWidth(15),
                  height: windowWidth(15),
                  backgroundColor: '#12BB70',
                }}
              />
              <Text
                style={{
                  fontSize: fontSizes.FONT18,
                  paddingLeft: windowWidth(5),
                  fontFamily: 'Poppins_400Regular',
                  color: theme.dark ? '#fff' : '#000',
                }}
              >
                our comprehensive project based courses
              </Text>
            </View>
          </View>

          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default Home;
