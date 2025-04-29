import { FlatList, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

import useGetCourses from '@/hooks/useGetCourses';
import { useTheme } from '@/context/theme.context';
import Skeleton from '@/components/common/Skeleton';
import CourseCard from '@/components/cards/CourseCard';
import GradientText from '@/components/common/GradientText';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

const Page = () => {
  const { theme } = useTheme();
  const { courses, loading } = useGetCourses();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.dark ? '#131313' : '#fff' }}
    >
      <View style={{ marginTop: verticalScale(-28) }}>
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
      </View>

      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

export default Page;

const ListHeader = () => {
  const { theme } = useTheme();

  return (
    <View style={{ marginHorizontal: windowWidth(20) }}>
      <View style={{ flexDirection: 'row', marginTop: windowHeight(8) }}>
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
        <View style={styles.dot} />
        <Text style={[styles.txt, { color: theme.dark ? '#fff' : '#000' }]}>
          our comprehensive project based courses
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    width: windowWidth(15),
    height: windowWidth(15),
    backgroundColor: '#12BB70',
    marginTop: verticalScale(-18),
  },

  txt: {
    fontSize: fontSizes.FONT18,
    paddingLeft: windowWidth(5),
    paddingBottom: windowHeight(20),
    fontFamily: 'Poppins_400Regular',
  },

  listContainer: {
    paddingHorizontal: scale(8),
    paddingBottom: windowHeight(18),
  },
});
