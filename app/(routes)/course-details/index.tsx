import { useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

import {
  IsIPAD,
  fontSizes,
  IsAndroid,
  windowWidth,
  SCREEN_WIDTH,
  windowHeight,
} from '@/themes/app.constant';
import { useUser } from '@/hooks/useUser';
import { CourseType, Reviews } from '@/types';
import { useTheme } from '@/context/theme.context';
import { Spacer } from '@/components/common/Skeleton';
import ReviewCard from '@/components/cards/ReviewCard';
import CourseInfo from '@/components/course/CourseInfo';
import CourseLesson from '@/components/course/CourseLesson';
import CourseDetailsTabs from '@/components/course/CourseDetailsTabs';

const CourseDetailsPage = () => {
  const { theme } = useTheme();
  const { item } = useLocalSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user, loader: userLoader } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState('About');

  const courseData: CourseType = JSON.parse(item as string);

  const reviewsFetchingHandler = async () => {
    setActiveButton('Reviews');

    const { data } = await axios.get(`get-reviews/${courseData.id}`);

    setLoader(false);
    setReviews(data.reviewsData);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: theme.dark ? '#131313' : '#fff' }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: windowWidth(15) }}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{ uri: courseData.thumbnail }}
          />
          <Text
            style={[styles.name, { color: theme.dark ? '#fff' : '#3E3B54' }]}
          >
            {courseData.name}
          </Text>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[styles.price, { color: theme.dark ? '#fff' : '#000' }]}
              >
                ${courseData?.price}
              </Text>

              <Text
                style={[
                  styles.estimatedPrice,
                  { color: theme.dark ? '#fff' : '#3E3B54' },
                ]}
              >
                ${courseData?.estimatedPrice}
              </Text>
            </View>

            <Text
              style={[styles.studText, { color: theme.dark ? '#fff' : '#000' }]}
            >
              {courseData?.purchased} Students
            </Text>
          </View>

          <CourseInfo
            title="Prerequisites"
            prerequisites={courseData.prerequisites}
          />

          <CourseInfo title="Benefits" prerequisites={courseData.benefits} />

          <View
            style={[
              styles.tabsContainer,
              { backgroundColor: theme.dark ? '#2A2D32' : '#E1E9F8' },
            ]}
          >
            <CourseDetailsTabs
              text="About"
              onPress={setActiveButton}
              activeButton={activeButton}
            />

            <CourseDetailsTabs
              text="Lessons"
              onPress={setActiveButton}
              activeButton={activeButton}
            />

            <CourseDetailsTabs
              text="Reviews"
              onPress={setActiveButton}
              activeButton={activeButton}
              reviewsFetchingHandler={reviewsFetchingHandler}
            />
          </View>

          {activeButton === 'About' && (
            <View
              style={{
                marginHorizontal: scale(12),
                marginVertical: verticalScale(10),
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes.FONT25,
                  fontFamily: 'Poppins_500Medium',
                  color: theme.dark ? '#fff' : '#000',
                }}
              >
                About course
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'justify',
                  fontSize: fontSizes.FONT20,
                  color: !theme.dark ? '#525258' : '#fff',
                }}
              >
                {isExpanded
                  ? courseData?.description
                  : courseData?.description.slice(0, 302)}
              </Text>

              {courseData?.description.length > 302 && (
                <TouchableOpacity
                  style={{ marginTop: verticalScale(2) }}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  <Text
                    style={{ color: '#2467EC', fontSize: fontSizes.FONT16 }}
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                    {isExpanded ? '-' : '+'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {activeButton === 'Lessons' && (
            <View
              style={{
                marginVertical: scale(15),
                marginHorizontal: verticalScale(16),
              }}
            >
              <CourseLesson courseDetails={courseData.courseData} />
            </View>
          )}

          {activeButton === 'Reviews' && (
            <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
              <View style={{ rowGap: 25 }}>
                {loader && (
                  <>
                    {[0, 1, 2, 3, 4, 5].map((i: any) => (
                      <MotiView
                        key={i}
                        transition={{ type: 'timing' }}
                        style={{
                          flex: 1,
                          gap: scale(10),
                          flexDirection: 'row',
                          marginVertical: verticalScale(10),
                        }}
                        animate={{
                          backgroundColor: theme.dark ? '#131313' : '#fff',
                        }}
                      >
                        <Skeleton
                          radius="round"
                          width={verticalScale(55)}
                          height={verticalScale(55)}
                          colorMode={theme.dark ? 'dark' : 'light'}
                        />

                        <View>
                          <Skeleton
                            width={scale(240)}
                            height={verticalScale(22)}
                            colorMode={theme.dark ? 'dark' : 'light'}
                          />

                          <Spacer height={verticalScale(15)} />

                          <Skeleton
                            width={scale(240)}
                            height={verticalScale(22)}
                            colorMode={theme.dark ? 'dark' : 'light'}
                          />
                        </View>
                      </MotiView>
                    ))}
                  </>
                )}
              </View>

              {courseData.reviews?.map((item: Reviews, index: number) => (
                <ReviewCard item={item} key={index} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetailsPage;

const styles = StyleSheet.create({
  img: {
    height: IsAndroid
      ? (SCREEN_WIDTH - 28) * 0.5625
      : (SCREEN_WIDTH - 40) * 0.5625,
    alignSelf: 'center',
    borderRadius: windowWidth(10),
    width: IsAndroid ? SCREEN_WIDTH - 40 : SCREEN_WIDTH - 25,
  },

  name: {
    fontSize: fontSizes.FONT22,
    lineHeight: windowHeight(20),
    paddingTop: verticalScale(10),
    fontFamily: 'Poppins_600SemiBold',
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: fontSizes.FONT22,
    paddingTop: windowHeight(8),
    lineHeight: windowHeight(20),
    fontFamily: 'Poppins_400Regular',
  },

  estimatedPrice: {
    fontSize: fontSizes.FONT22,
    paddingLeft: windowWidth(5),
    fontFamily: 'Poppins_400Regular',
    textDecorationLine: 'line-through',
    lineHeight: IsIPAD ? windowHeight(0) : windowHeight(20),
  },

  studText: {
    fontSize: fontSizes.FONT18,
    fontFamily: 'Poppins_400Regular',
  },

  tabsContainer: {
    flexDirection: 'row',
    borderRadius: scale(50),
    justifyContent: 'center',
    height: verticalScale(35),
    marginHorizontal: scale(8),
    marginTop: verticalScale(15),
  },
});
