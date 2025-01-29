import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import Swiper from 'react-native-swiper';
import * as WebBrowser from 'expo-web-browser';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { IsIPAD } from '@/themes/app.constant';
import { bannerData } from '@/constants/data';

const HomeBanner = () => {
  const handlePress = async (item: string) => {
    await WebBrowser.openBrowserAsync(item);
  };

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        autoplayTimeout={5}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        style={{ height: IsIPAD ? moderateScale(240) : moderateScale(230) }}
      >
        {bannerData.map(({ image, url }) => (
          <Pressable
            key={url}
            style={styles.slide}
            onPress={handlePress.bind(this, url)}
          >
            <Image
              source={{ uri: image }}
              style={{
                objectFit: 'cover',
                borderRadius: scale(5),
                height: IsIPAD ? moderateScale(200) : moderateScale(185),
              }}
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(7),
  },

  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(5),
    backgroundColor: '#C6C7CC',
    marginHorizontal: verticalScale(3),
  },

  activeDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(5),
    backgroundColor: '#2467EC',
    marginHorizontal: verticalScale(3),
  },

  slide: {
    flex: 1,
    marginHorizontal: scale(10),
  },
});
