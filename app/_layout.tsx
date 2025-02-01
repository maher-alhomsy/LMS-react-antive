import { useEffect } from 'react';

import axios from 'axios';
import {
  Poppins_700Bold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';

import { ThemeProvider } from '@/context/theme.context';

SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_SERVER_URI;

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(routes)/faq/index" />
        <Stack.Screen name="(routes)/settings/index" />
        <Stack.Screen name="(routes)/onboarding/index" />
        <Stack.Screen name="(routes)/notifications/index" />
        <Stack.Screen name="(routes)/support-center/index" />
      </Stack>
    </ThemeProvider>
  );
}
