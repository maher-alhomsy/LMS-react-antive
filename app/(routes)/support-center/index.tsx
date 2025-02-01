import { useState } from 'react';
import {
  View,
  Text,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';
import IconOne from '@/assets/svgs/onboarding/icon-1';
import IconTwo from '@/assets/svgs/onboarding/icon-2';
import IconThree from '@/assets/svgs/onboarding/icon-3';
import SupportCard from '@/components/common/SupportCard';
import TicketModal from '@/components/common/TicketModal';
import SupportBannerOne from '@/assets/svgs/support-senter/one';
import SupportBannerTwo from '@/assets/svgs/support-senter/two';
import SupportBannerThree from '@/assets/svgs/support-senter/three';

const Page = () => {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.dark ? '#101010' : '#fff',
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.dark ? '#8673FC' : '#9DCDFF' },
        ]}
      >
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={scale(22)} color="black" />
        </Pressable>

        <View style={{ flexDirection: 'row' }}>
          <SupportBannerOne />
          <SupportBannerTwo />
          <SupportBannerThree />
        </View>
      </View>

      <View style={{ padding: scale(20) }}>
        <Text style={[styles.title, { color: theme.dark ? '#fff' : '#000' }]}>
          Tell us how can we help 👋🏻
        </Text>

        <Text
          style={[styles.subTitle, { color: theme.dark ? '#fff' : '#000' }]}
        >
          We are always available to provide you with the best services we can
        </Text>

        <SupportCard
          title="Chat"
          icon={<IconOne />}
          onPress={() => setOpen(true)}
          subTitle="Start a conversation now!"
        />

        <SupportCard
          title="FAQ's"
          icon={<IconTwo />}
          subTitle="Find intelligent answers instantly"
        />

        <SupportCard
          title="Email"
          icon={<IconThree />}
          subTitle="Get solution directly to inbox"
          onPress={() => Linking.openURL('mailto:maheralhomsy2002@gmail.com')}
        />
      </View>

      {open && <TicketModal isOpen={open} onClose={() => setOpen(false)} />}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(300),
    paddingTop: verticalScale(45),
    paddingHorizontal: scale(20),
    overflow: 'hidden',
    position: 'relative',
  },

  btn: {
    width: scale(35),
    height: scale(35),
    alignItems: 'center',
    borderRadius: scale(5),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
    fontSize: fontSizes.FONT30,
    fontFamily: 'Poppins_600SemiBold',
  },

  subTitle: {
    textAlign: 'center',
    fontSize: fontSizes.FONT18,
    fontFamily: 'Poppins_400Regular',
  },
});
