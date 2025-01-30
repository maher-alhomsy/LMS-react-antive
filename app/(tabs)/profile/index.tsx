import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/theme.context';
import { useUser } from '@/hooks/useUser';
import useUserData from '@/hooks/useUserData';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fontSizes,
  IsAndroid,
  IsHaveNotch,
  IsIPAD,
} from '@/themes/app.constant';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';

const Page = () => {
  const { theme } = useTheme();
  const { user, loader } = useUser();
  const { avatar, email, name } = useUserData();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.dark ? '#101010' : '#f5f5f5' },
      ]}
    >
      <LinearGradient
        style={styles.header}
        start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
        end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        colors={
          theme.dark
            ? ['#121121', '#3c43c85c', '#121121']
            : ['#6248FF', '#8673FC']
        }
      >
        <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View>
              <ThemeSwitcher />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
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
    marginTop: verticalScale(-90),
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

  statsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'space-around',
  },

  statBox: {
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
