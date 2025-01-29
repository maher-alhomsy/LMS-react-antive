import { useState } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import {
  IsIPAD,
  fontSizes,
  IsAndroid,
  IsHaveNotch,
  windowHeight,
  windowWidth,
} from '@/themes/app.constant';
import useUserData from '@/hooks/useUserData';
import { useTheme } from '@/context/theme.context';

const WelcomeHeader = () => {
  const { theme } = useTheme();
  const { name } = useUserData();

  const [notificationLength, setNotificationLength] = useState(0);

  return (
    <LinearGradient
      colors={
        theme.dark
          ? ['#3c43485c', '#3c43485c', '#3c43485c']
          : ['#75ABFC', '#0047AB']
      }
      end={{ x: 0, y: 1 }}
      start={{ x: 1, y: 1 }}
      style={styles.headerWrapper}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingTop: IsHaveNotch
            ? IsIPAD
              ? verticalScale(30)
              : verticalScale(40)
            : verticalScale(30),
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSizes.FONT32,
              fontFamily: 'Poppins_600SemiBold',
            }}
          >
            Hi {name.split(' ')[0]}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: fontSizes.FONT22,
              fontFamily: 'Poppins_400Regular',
            }}
          >
            Let's start Learning
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => {}}>
            <View
              style={[
                styles.notificationWrapper,
                {
                  borderWidth: theme.dark ? 1 : 0,
                  borderColor: theme.dark ? '#fff' : 'transparent',
                  backgroundColor: theme.dark ? 'transparent' : '#004fab',
                },
              ]}
            >
              <Ionicons
                color="#fff"
                size={scale(25)}
                name="notifications-sharp"
              />

              <View style={styles.dot}>
                <Text style={{ fontSize: fontSizes.FONT14, color: '#fff' }}>
                  {notificationLength}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ position: 'relative' }}>
        <TextInput
          placeholder="Search for Topics, Courses"
          style={[
            styles.input,
            {
              borderWidth: theme.dark ? 1 : 0,
              borderColor: theme.dark ? '#fff' : '',
              color: theme.dark ? '#fff' : '#000',
              backgroundColor: theme.dark ? 'transparent' : '#fff',
            },
          ]}
          placeholderTextColor={theme.dark ? '#fff' : '#000'}
        />

        <Pressable
          style={{
            position: 'absolute',
            top: windowHeight(16),
            right: windowWidth(10),
          }}
        >
          <EvilIcons
            name="search"
            size={IsIPAD ? scale(20) : scale(30)}
            color={theme.dark ? '#fff' : 'blue'}
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    height: IsHaveNotch
      ? IsIPAD
        ? verticalScale(175)
        : verticalScale(155)
      : IsAndroid
      ? verticalScale(168)
      : verticalScale(162),
    paddingHorizontal: moderateScale(25),
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    paddingTop: IsAndroid ? verticalScale(10) : verticalScale(0),
  },

  notificationWrapper: {
    width: scale(45),
    borderRadius: 10,
    height: scale(45),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: scale(13),
    height: scale(13),
    position: 'absolute',
    alignItems: 'center',
    top: windowHeight(10),
    right: windowWidth(15),
    justifyContent: 'center',
    borderRadius: scale(100),
    backgroundColor: '#19c964',
  },

  input: {
    color: '#000',
    backgroundColor: '#fff',
    marginTop: verticalScale(12),
    borderRadius: moderateScale(30),
    fontFamily: 'Poppins_400Regular',
    paddingHorizontal: moderateScale(15),
    fontSize: IsIPAD ? fontSizes.FONT15 : fontSizes.FONT18,
    height: IsHaveNotch ? verticalScale(35) : verticalScale(40),
  },
});
