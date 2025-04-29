import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

import {
  IsAndroid,
  fontSizes,
  windowWidth,
  windowHeight,
  SCREEN_WIDTH,
} from '@/themes/app.constant';
import { CourseType } from '@/types';
import Ratings from '../common/Ratings';
import { useTheme } from '@/context/theme.context';

const CourseCard = ({ item }: { item: CourseType }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={styles.btn}
      onPress={() =>
        router.push({
          pathname: '/(routes)/course-details',
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.dark ? '#3c43485c' : '#eaf3fb85' },
        ]}
      >
        <Image
          style={styles.img}
          resizeMode="contain"
          source={{ uri: item.thumbnail }}
        />

        <View style={styles.contentContainer}>
          <Text
            style={[styles.name, { color: theme.dark ? '#fff' : '#3E3B54' }]}
          >
            {item.name}
          </Text>

          <View style={styles.infoContainer}>
            <Ratings rating={item.ratings} />

            <Text
              style={[
                styles.studentText,
                { color: !theme.dark ? '#3E3B54' : '#fff' },
              ]}
            >
              {item?.purchased} Students
            </Text>
          </View>

          <View style={styles.innerContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[styles.price, { color: !theme.dark ? '#000' : '#fff' }]}
              >
                {item.price === 0 ? 'Free' : item.price + '$'}
              </Text>

              <Text
                style={[
                  styles.estimatedPrice,
                  { color: !theme.dark ? '#3E3B54' : '#fff' },
                ]}
              >
                {item.estimatedPrice}$
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather
                name="list"
                size={scale(20)}
                color={theme.dark ? '#fff' : '#3E3B54'}
              />

              <Text
                style={[
                  styles.lecturesCount,
                  { color: !theme.dark ? '#3E3B54' : '#fff' },
                ]}
              >
                {item?.courseData?.length} Lectures
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: windowHeight(5),
    paddingHorizontal: windowWidth(5),
  },

  card: {
    shadowOpacity: 0.1,
    shadowColor: '#40e0d0',
    borderRadius: windowWidth(10),
  },

  img: {
    height: IsAndroid
      ? (SCREEN_WIDTH - 28) * 0.5625
      : (SCREEN_WIDTH - 40) * 0.5625,
    alignSelf: 'center',
    borderRadius: windowWidth(10),
    width: IsAndroid ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 25,
  },

  contentContainer: {
    paddingBottom: windowHeight(5),
    paddingHorizontal: windowWidth(15),
  },

  name: {
    fontSize: fontSizes.FONT18,
    paddingTop: windowHeight(5),
    fontFamily: 'Poppins_400Regular',
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: windowHeight(5),
  },

  studentText: {
    fontSize: fontSizes.FONT18,
    fontFamily: 'Poppins_400Regular',
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: windowHeight(5),
  },

  price: {
    fontSize: fontSizes.FONT20,
    fontFamily: 'Poppins_400Regular',
  },

  estimatedPrice: {
    fontSize: fontSizes.FONT20,
    paddingLeft: windowWidth(5),
    marginTop: windowHeight(-5),
    fontFamily: 'Poppins_400Regular',
    textDecorationLine: 'line-through',
  },

  lecturesCount: {
    fontSize: fontSizes.FONT20,
    paddingLeft: windowWidth(5),
    fontFamily: 'Poppins_400Regular',
  },
});
