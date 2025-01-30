import { View, StyleSheet } from 'react-native';

import { MotiView } from 'moti';
import { scale } from 'react-native-size-matters';
import { Skeleton as MotiSkeleton } from 'moti/skeleton';

import { useTheme } from '@/context/theme.context';
import { windowHeight, windowWidth } from '@/themes/app.constant';

const Skeleton = () => {
  let { theme } = useTheme();

  return (
    <MotiView
      transition={{ type: 'timing' }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: theme.dark ? 'transparent' : '#fff' }}
    >
      <MotiSkeleton
        width={windowWidth(440)}
        height={windowHeight(160)}
        colorMode={theme.dark ? 'dark' : 'light'}
      />
      <Spacer />

      <View style={{ flexDirection: 'row', gap: windowWidth(15) }}>
        <MotiSkeleton
          radius="round"
          width={windowWidth(80)}
          height={windowWidth(80)}
          colorMode={theme.dark ? 'dark' : 'light'}
        />

        <View>
          <MotiSkeleton
            width={windowWidth(338)}
            height={windowHeight(20)}
            colorMode={theme.dark ? 'dark' : 'light'}
          />
          <Spacer />
          <MotiSkeleton
            width={windowWidth(338)}
            height={windowHeight(20)}
            colorMode={theme.dark ? 'dark' : 'light'}
          />
          <Spacer />
        </View>
      </View>
    </MotiView>
  );
};

export default Skeleton;

export const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: { padding: scale(14) },
});
