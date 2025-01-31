import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import {
  fontSizes,
  windowWidth,
  windowHeight,
  SCREEN_WIDTH,
} from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

type Props = {
  url: string;
  title: string;
  thumbnail: string;
};
const SourceCodeCard = ({ thumbnail, title, url }: Props) => {
  const { theme } = useTheme();

  const pressHandler = async () => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <Pressable
      style={{
        paddingVertical: windowHeight(7),
        paddingHorizontal: windowWidth(20),
      }}
      onPress={pressHandler}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.dark ? '#3c43485c' : '#eaf3fb85' },
        ]}
      >
        <Image source={{ uri: thumbnail }} style={styles.img} />

        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.dark ? '#fff' : '#3E3B54' }]}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SourceCodeCard;

const styles = StyleSheet.create({
  card: {
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: '#40E0D0',
    borderRadius: windowWidth(10),
  },

  img: {
    alignSelf: 'center',
    width: SCREEN_WIDTH - 52,
    borderRadius: windowWidth(10),
    height: (SCREEN_WIDTH - 40) * 0.5625,
  },

  titleWrapper: {
    paddingBottom: windowHeight(5),
    paddingHorizontal: windowWidth(15),
  },

  title: {
    fontSize: fontSizes.FONT18,
    paddingTop: windowHeight(5),
    fontFamily: 'Poppins_400Regular',
  },
});
