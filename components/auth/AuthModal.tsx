import { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

import JWT from 'expo-jwt';
import { BlurView } from 'expo-blur';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
const AuthModal = () => {
  const configureGoogleSignIn = () => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure();
    } else {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const googleSignIn = async () => {
    try {
      const { data } = await GoogleLogin();

      authHandler({
        name: data?.user.name!,
        email: data?.user.email!,
        avatar: data?.user.photo!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const authHandler = ({
    name,
    email,
    avatar,
  }: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    const user = {
      name,
      email,
      avatar,
    };

    const token = JWT.encode(
      {
        ...user,
      },
      process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
    );

    console.log(token);
  };

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Pressable style={styles.btn} onPress={(e) => e.stopPropagation()}>
        <Text
          style={{
            fontSize: fontSizes.FONT35,
            fontFamily: 'Poppins_700Bold',
          }}
        >
          Join to Becodemy
        </Text>

        <Text
          style={{
            fontSize: fontSizes.FONT17,
            paddingTop: windowHeight(5),
            fontFamily: 'Poppins_300Light',
          }}
        >
          It's easier than your imagination!
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: windowWidth(20),
            paddingVertical: windowHeight(10),
          }}
        >
          <Pressable onPress={() => googleSignIn()}>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/google.png')}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/github.png')}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/apple.png')}
            />
          </Pressable>
        </View>
      </Pressable>
    </BlurView>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    alignItems: 'center',
    width: windowWidth(420),
    justifyContent: 'center',
    height: windowHeight(250),
    backgroundColor: '#fff',
    marginHorizontal: windowWidth(50),
  },

  img: {
    resizeMode: 'contain',
    width: windowWidth(40),
    height: windowHeight(40),
  },
});
