import { FlatList, View } from 'react-native';

import { verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/context/theme.context';
import { videoLessonsData } from '@/constants/data';
import SourceCodeCard from '@/components/common/SourceCodeCard';

const Page = () => {
  const { theme } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.dark ? '#131313' : '#fff' }}
    >
      <View style={{ paddingBottom: bottomTabBarHeight - 20 }}>
        <FlatList
          data={videoLessonsData}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: verticalScale(10) }}
          renderItem={({ item }) => <SourceCodeCard {...item} />}
          contentContainerStyle={{ paddingBottom: verticalScale(40) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Page;
