import { StyleSheet } from 'react-native';

import { Stack } from 'expo-router';
import { useTheme } from '@/context/theme.context';
import { fontSizes } from '@/themes/app.constant';

const RoutesLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Course Details',
          headerTitleStyle: {
            color: theme.dark ? '#fff' : '#000',
            fontSize: fontSizes.FONT22,
          },
          headerTintColor: theme.dark ? '#fff' : '#005DE0',
          headerStyle: { backgroundColor: theme.dark ? '#131313' : '#fff' },
        }}
      />
    </Stack>
  );
};

export default RoutesLayout;

const styles = StyleSheet.create({});
