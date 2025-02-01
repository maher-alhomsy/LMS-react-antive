import { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { MotiView } from 'moti';
import { router } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';
import { NotificationsData } from '@/constants/data';
import FilterButton from '@/components/common/FilterButton';
import NotificationItem from '@/components/common/NotificationItem';

const Page = () => {
  const { theme } = useTheme();

  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(false);

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}
      >
        <View style={{ overflow: 'hidden', paddingBottom: verticalScale(1) }}>
          <View
            style={[
              styles.btnWrapper,
              {
                shadowColor: theme.dark ? '#fff' : '#000',
                backgroundColor: theme.dark ? '#131313' : '#fff',
              },
            ]}
          >
            <Pressable style={styles.btn} onPress={() => router.back()}>
              <AntDesign
                name="left"
                size={scale(22)}
                color={theme.dark ? '#fff' : '#005De0'}
              />

              <Text
                style={{
                  fontSize: fontSizes.FONT20,
                  color: theme?.dark ? '#fff' : '#005DE0',
                }}
              >
                Back
              </Text>
            </Pressable>

            <Text
              style={{
                width: scale(220),
                textAlign: 'center',
                fontSize: fontSizes.FONT22,
                color: theme.dark ? '#fff' : '#000',
              }}
            >
              Notifications
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.container,
            { backgroundColor: theme.dark ? '#101010' : '#fff' },
          ]}
        >
          {loading ? (
            <View style={{ padding: scale(16) }}>
              {Array.from({ length: 7 }, (_, i) => i).map((i) => (
                <MotiView
                  key={i}
                  style={{
                    gap: scale(15),
                    flexDirection: 'row',
                    marginBottom: verticalScale(15),
                  }}
                  transition={{ type: 'timing' }}
                  animate={{ backgroundColor: theme.dark ? '#101010' : '#fff' }}
                >
                  <Skeleton
                    radius="round"
                    width={scale(60)}
                    height={scale(60)}
                    colorMode={theme.dark ? 'dark' : 'light'}
                  />

                  <Skeleton
                    height={scale(50)}
                    width={scale(240)}
                    colorMode={theme.dark ? 'dark' : 'light'}
                  />
                </MotiView>
              ))}
            </View>
          ) : (
            <View>
              <ScrollView
                horizontal
                style={{ padding: scale(10) }}
                showsHorizontalScrollIndicator={false}
              >
                <FilterButton
                  text="All"
                  isActive={active === 'All'}
                  onPress={() => setActive('All')}
                />

                <FilterButton
                  text="Courses"
                  isActive={active === 'Courses'}
                  onPress={() => setActive('Courses')}
                />

                <FilterButton
                  text="Resources"
                  isActive={active === 'Resources'}
                  onPress={() => setActive('Resources')}
                />

                <FilterButton
                  text="Support Center"
                  isActive={active === 'Support Center'}
                  onPress={() => setActive('Support Center')}
                />
              </ScrollView>

              <FlatList
                data={NotificationsData}
                renderItem={({ item }) => <NotificationItem {...item} />}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  btnWrapper: {
    elevation: 5,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(25),
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(5),
    shadowOffset: { width: 0, height: 1 },
  },

  btn: {
    gap: scale(5),
    alignItems: 'center',
    flexDirection: 'row',
  },

  container: {
    backgroundColor: '#fff',
    marginTop: verticalScale(2),
  },
});
