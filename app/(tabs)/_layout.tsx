import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/context/theme.context';
import { fontSizes, IsAndroid, IsIOS, IsIPAD } from '@/themes/app.constant';

export default function _layout() {
  const { theme } = useTheme();
  const { loader } = useUser();

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'index') {
              iconName = (
                <Feather
                  name="home"
                  color={color}
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : 'auto' }}
                />
              );
            } else if (route.name === 'courses/index') {
              iconName = (
                <Feather
                  color={color}
                  name="book-open"
                  size={moderateScale(24)}
                  style={{ width: IsIPAD ? scale(20) : 'auto' }}
                />
              );
            } else if (route.name === 'resources/index') {
              iconName = (
                <Ionicons
                  color={color}
                  size={moderateScale(24)}
                  name="document-text-outline"
                  style={{ width: IsIPAD ? scale(20) : 'auto' }}
                />
              );
            } else if (route.name === 'profile/index') {
              iconName = (
                <Octicons
                  name="person"
                  color={color}
                  size={moderateScale(26)}
                  style={{ width: IsIPAD ? scale(20) : 'auto' }}
                />
              );
            } else {
              return null;
            }
            return iconName;
          },
          tabBarInactiveTintColor: theme.dark ? '#fff' : '#8e8e93',
          tabBarActiveTintColor: theme.dark ? '#19C964' : '#4A90E2',
          headerShown:
            route.name === 'courses/index' || route.name === 'resources/index'
              ? true
              : false,
          headerTitle:
            route.name === 'courses/index'
              ? 'Courses'
              : route.name === 'resources/index'
              ? 'Video Lessons'
              : '',
          headerTitleStyle: {
            width: scale(320),
            textAlign: 'center',
            fontSize: fontSizes.FONT22,
            fontFamily: 'Poppins_400Regular',
            color: theme.dark ? '#fff' : '#000',
          },
          headerBackgroundContainerStyle: {
            elevation: 1,
            shadowRadius: 1,
            shadowOpacity: theme.dark ? 0.1 : 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowColor: theme.dark ? '#fff' : '#000',
            backgroundColor: theme.dark ? '#131313' : '#fff',
          },
          headerBackground: () => (
            <BlurView
              intensity={theme.dark ? 70 : 80}
              experimentalBlurMethod="dimezisBlurView"
              style={{
                overflow: 'hidden',
                borderTopLeftRadius: scale(20),
                backgroundColor: 'transparent',
                borderTopRightRadius: scale(20),
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            position: IsIOS ? (theme.dark ? 'absolute' : 'static') : 'absolute',
            borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
            borderTopRightRadius: IsAndroid
              ? 0
              : IsIPAD
              ? scale(20)
              : scale(35),
            borderTopWidth: 0,
            opacity: loader ? 0 : 1,
            height: verticalScale(55),
            transition: 'opacity 0.3s ease-in-out',
          },
          tabBarBackground: () => {
            return (
              <>
                {IsIOS && !theme.dark ? (
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: '#fff',
                      borderTopLeftRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      borderTopRightRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      overflow: 'hidden',
                    }}
                  />
                ) : (
                  <BlurView
                    experimentalBlurMethod="dimezisBlurView"
                    intensity={theme.dark ? (IsAndroid ? 10 : 60) : 100}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderTopLeftRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      borderTopRightRadius: IsAndroid
                        ? 0
                        : IsIPAD
                        ? scale(25)
                        : scale(35),
                      overflow: 'hidden',
                      backgroundColor: IsAndroid
                        ? theme.dark
                          ? '#131313'
                          : '#fff'
                        : theme.dark
                        ? 'transparent'
                        : '#fff',
                    }}
                  />
                )}
              </>
            );
          },
        };
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="resources/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
