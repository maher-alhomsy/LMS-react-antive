import { Stack } from 'expo-router';

import { ThemeProvider } from '@/context/theme.context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
