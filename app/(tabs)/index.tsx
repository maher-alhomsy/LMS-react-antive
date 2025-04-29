import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';

import useGetCourses from '@/hooks/useGetCourses';
import { useTheme } from '@/context/theme.context';
import Skeleton from '@/components/common/Skeleton';
import HomeBanner from '@/components/home/HomeBanner';
import CourseCard from '@/components/cards/CourseCard';
import WelcomeHeader from '@/components/home/WelcomeHeader';
import GradientText from '@/components/common/GradientText';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

const Home = () => {
  const { theme } = useTheme();
  const { courses, error, loading } = useGetCourses();

  return (
    <>
      <LinearGradient
        end={{ x: 0, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}
        colors={
          theme.dark ? ['#180d41', '#2A2D32', '#131313'] : ['#fff', '#f7f7f7']
        }
      >
        <WelcomeHeader />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: windowHeight(50) }}
        >
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                data={courses}
                ListHeaderComponent={ListHeader}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CourseCard item={item} />}
                ListEmptyComponent={<Text>No Courses Available yet!</Text>}
              />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default Home;

const ListHeader = () => {
  const { theme } = useTheme();

  return (
    <>
      <HomeBanner />
      <View
        style={{
          marginTop: verticalScale(-25),
          marginHorizontal: windowWidth(20),
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: windowHeight(5) }}>
          <Text
            style={{
              fontSize: fontSizes.FONT35,
              fontFamily: 'Poppins_500Medium',
              color: theme.dark ? '#fff' : '#000',
            }}
          >
            Popular
          </Text>

          <GradientText
            text=" Courses"
            styles={{
              fontSize: fontSizes.FONT35,
              fontFamily: 'Poppins_500Medium',
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.gradientText} />
          <Text
            style={[styles.innerText, { color: theme.dark ? '#fff' : '#000' }]}
          >
            our comprehensive project based courses
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradientText: {
    borderRadius: 100,
    width: windowWidth(15),
    height: windowWidth(15),
    backgroundColor: '#12BB70',
  },

  innerText: {
    fontSize: fontSizes.FONT18,
    paddingLeft: windowWidth(5),
    fontFamily: 'Poppins_400Regular',
  },

  listContainer: {
    paddingHorizontal: scale(8),
    paddingBottom: windowHeight(18),
  },
});
