import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';

import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

import {
  IsIPAD,
  IsAndroid,
  fontSizes,
  IsHaveNotch,
} from '@/themes/app.constant';
import { useUser } from '@/hooks/useUser';
import useUserData from '@/hooks/useUserData';
import { useTheme } from '@/context/theme.context';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import ProfileSection from '@/components/common/ProfileSection';
import { router } from 'expo-router';

const Page = () => {
  const { theme } = useTheme();
  const { user, loader } = useUser();
  const { avatar, email, name } = useUserData();

  const logoutHandler = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    router.replace('/(routes)/onboarding');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.dark ? '#101010' : '#f5f5f5' },
      ]}
    >
      <LinearGradient
        style={styles.header}
        end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
        colors={
          theme.dark
            ? ['#121121', '#3c43c85c', '#121121']
            : ['#6248FF', '#8673FC']
        }
      >
        <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <ThemeSwitcher />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View
        style={[
          styles.profileWrapper,
          {
            backgroundColor: theme.dark ? '#121121' : '#fff',
            shadowOpacity: theme.dark ? 0.12 : 0.25,
          },
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: avatar ?? '' }} style={styles.profileImage} />
          <View style={styles.profileTextContainer}>
            <Text
              style={[
                styles.profileName,
                { color: theme.dark ? '#fff' : '#000' },
              ]}
            >
              {name}
            </Text>
            <Text style={styles.profileTitle}>{email}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <LinearGradient
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 1 }}
            style={styles.statusBox}
            colors={['#01CED3', '#0185F7']}
          >
            <Text style={styles.statNumber}>{user?.orders?.length}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </LinearGradient>

          <LinearGradient
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 1 }}
            style={styles.statusBox}
            colors={['#BF6FF8', '#3C1BE9']}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </LinearGradient>
        </View>
      </View>

      <ScrollView
        style={{ padding: scale(20) }}
        contentContainerStyle={{ paddingBottom: verticalScale(65) }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileSection
          title="Enrolled Courses"
          subTitle="Explore your all enrolled courses"
          icon={
            <Feather
              name="book-open"
              size={scale(21)}
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="Course Leaderboard"
          subTitle="Let's see your position in Leaderboard"
          icon={
            <MaterialIcons
              size={scale(23)}
              name="leaderboard"
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="My Tickets"
          subTitle="Explore your all support tickets"
          icon={
            <MaterialCommunityIcons
              size={scale(22)}
              name="message-alert-outline"
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="Support Center"
          subTitle="Explore our fastest support center"
          icon={
            <FontAwesome
              name="support"
              size={scale(22)}
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="Notifications"
          subTitle="Explore the important notifications"
          onPress={() => router.push('/(routes)/notifications')}
          icon={
            <Ionicons
              size={scale(22)}
              name="notifications"
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="Settings"
          subTitle="Control the app as per your preferences"
          icon={
            <Ionicons
              size={scale(23)}
              name="settings-sharp"
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          title="Privacy & Policy"
          subTitle="Explore our privacy and policy"
          icon={
            <MaterialIcons
              name="policy"
              size={scale(23)}
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />

        <ProfileSection
          onPress={logoutHandler}
          title="Log Out"
          subTitle="Logging out from your account"
          icon={
            <MaterialIcons
              name="logout"
              size={scale(23)}
              color={theme.dark ? '#fff' : '#0047AB'}
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    padding: scale(20),
    height: verticalScale(180),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#fff',
    fontSize: fontSizes.FONT28,
    fontFamily: 'Poppins_500Medium',
  },

  profileWrapper: {
    width: scale(320),
    height: IsAndroid
      ? verticalScale(155)
      : !IsHaveNotch
      ? verticalScale(175)
      : IsIPAD
      ? verticalScale(185)
      : verticalScale(155),
    zIndex: 10,
    elevation: 5,
    padding: scale(15),
    shadowRadius: 3.84,
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowColor: '#999',
    borderRadius: scale(20),
    backgroundColor: '#fff',
    marginTop: verticalScale(-70),
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(10),
  },

  profileTextContainer: {
    marginLeft: scale(10),
    marginBottom: verticalScale(10),
  },

  profileName: {
    color: '#000',
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_500Medium',
  },

  profileTitle: {
    width: scale(230),
    color: '#8a8a8a',
    overflow: 'hidden',
    fontSize: fontSizes.FONT17,
    fontFamily: 'Poppins_400Regular',
  },

  statusContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'space-around',
  },

  statusBox: {
    color: '#fff',
    width: scale(120),
    alignItems: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    height: verticalScale(62),
  },

  statNumber: {
    color: '#fff',
    fontSize: fontSizes.FONT25,
    fontFamily: 'Poppins_700Bold',
  },

  statLabel: {
    color: '#fff',
    fontSize: fontSizes.FONT20,
    fontFamily: 'Poppins_400Regular',
  },
});
