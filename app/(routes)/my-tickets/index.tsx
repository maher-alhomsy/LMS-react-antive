import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';
import IconSix from '@/assets/svgs/support-center/six';

const Page = () => {
  const { theme } = useTheme();

  const [status, setStatus] = useState('Pending');

  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.dark ? '#8673FC' : '#9DCDFF' },
        ]}
      >
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>My Tickets</Text>

        <View style={{ flexDirection: 'row' }}>
          <IconSix />
        </View>
      </View>

      <ScrollView style={{ padding: scale(15) }}>
        <Pressable
          style={[
            styles.btnContainer,
            { backgroundColor: theme.dark ? '#3c43485c' : '#eaf3fb85' },
          ]}
        >
          <Text
            style={[
              styles.paymentText,
              { color: theme.dark ? '#fff' : '#000' },
            ]}
          >
            Payment method is not working!
          </Text>

          <Text
            style={[
              styles.statusText,
              {
                color:
                  status !== 'Pending'
                    ? '#19C964'
                    : theme.dark
                    ? '#fff'
                    : '#000',
                opacity: status === 'Pending' ? 0.7 : 1,
              },
            ]}
          >
            {status}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    position: 'relative',
    height: verticalScale(240),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(45),
  },

  backBtn: {
    width: scale(35),
    height: scale(35),
    alignItems: 'center',
    borderRadius: scale(5),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  title: {
    color: '#fff',
    left: scale(120),
    textAlign: 'center',
    position: 'absolute',
    top: verticalScale(50),
    fontSize: fontSizes.FONT28,
    fontFamily: 'Poppins_600SemiBold',
  },

  btnContainer: {
    shadowRadius: 5,
    shadowOpacity: 0.1,
    padding: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(10),
    shadowColor: '#40E0D0',
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
  },

  paymentText: {
    width: scale(220),
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_500Medium',
  },

  statusText: {
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_500Medium',
  },
});
