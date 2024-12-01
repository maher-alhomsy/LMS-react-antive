import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
