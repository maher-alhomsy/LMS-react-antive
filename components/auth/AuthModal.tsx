import { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

import axios from 'axios';
import JWT from 'expo-jwt';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
const AuthModal = ({
  setModalVisible,
}: {
  setModalVisible: (modal: boolean) => void;
}) => {
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

  const githubAuthEndpoint = {
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
  };

  const [request, response] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({ scheme: 'myapp' }),
    },
    githubAuthEndpoint
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      fetchAccessToken(code);
    }
  }, []);

  const handleGithubLogin = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      request?.url!,
      makeRedirectUri({ scheme: 'myapp' })
    );

    if (result.type === 'success' && result.url) {
      const urlParams = new URLSearchParams(result.url.split('?')[1]);
      const code: any = urlParams.get('code');

      fetchAccessToken(code);
    }
  };

  const fetchAccessToken = async (code: string) => {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`,
      }
    );

    const { access_token } = await tokenResponse.json();
    fetchUserInfo(access_token);
  };

  const fetchUserInfo = async (token: string) => {
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await userResponse.json();

    await authHandler({
      name: userData.name!,
      email: userData.email!,
      avatar: userData.avatar_url!,
    });
  };

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

  const authHandler = async ({
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
      { ...user },
      process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
    );

    const { data } = await axios.post('login', { signedToken: token });

    Promise.all([
      SecureStore.setItemAsync('name', name),
      SecureStore.setItemAsync('email', email),
      SecureStore.setItemAsync('avatar', avatar),
      SecureStore.setItemAsync('accessToken', data.accessToken),
    ]);
    setModalVisible(false);
    router.push('/(tabs)');
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

          <Pressable onPress={handleGithubLogin}>
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
