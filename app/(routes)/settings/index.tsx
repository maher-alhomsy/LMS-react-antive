import { useEffect, useState } from 'react';
import { Text, View, Pressable, ScrollView, StyleSheet } from 'react-native';

import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';
import SettingsSection from '@/components/common/SettingsSection';

const Page = () => {
  const { theme, toggleTheme } = useTheme();

  const [courseUpdates, setcourseUpdates] = useState(false);
  const [latestUpdates, setlatestUpdates] = useState(false);
  const [supportTicketResponse, setsupportTicketResponse] = useState(false);

  useEffect(() => {
    const checkForPreferences = async () => {
      const courseUpdates = await AsyncStorage.getItem('courseUpdates');
      const supportTicketResponse = await AsyncStorage.getItem(
        'supportTicketResponse'
      );
      const latestUpdates = await AsyncStorage.getItem('latestUpdates');

      if (courseUpdates || supportTicketResponse || latestUpdates) {
        setcourseUpdates(courseUpdates === 'true' ? true : false);
        setsupportTicketResponse(
          supportTicketResponse === 'true' ? true : false
        );
        setlatestUpdates(latestUpdates === 'true' ? true : false);
      } else {
        await AsyncStorage.setItem('courseUpdates', 'true');
        await AsyncStorage.setItem('latestUpdates', 'true');
        await AsyncStorage.setItem('supportTicketResponse', 'true');

        setcourseUpdates(true);
        setlatestUpdates(true);
        setsupportTicketResponse(true);
      }
    };

    checkForPreferences();
  }, []);

  const updatePreferences = async (e: string) => {
    if (e === 'courseUpdates') {
      setcourseUpdates(!courseUpdates);
      await AsyncStorage.setItem('courseUpdates', `${!courseUpdates}`);
    } else if (e === 'supportTicketResponse') {
      setsupportTicketResponse(!supportTicketResponse);

      await AsyncStorage.setItem(
        'supportTicketResponse',
        `${!supportTicketResponse}`
      );
    } else {
      setlatestUpdates(!latestUpdates);
      await AsyncStorage.setItem('latestUpdates', `${!latestUpdates}`);
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}
    >
      <View
        style={[
          styles.container,
          {
            shadowColor: theme.dark ? '#fff' : '#000',
            backgroundColor: theme.dark ? '#131313' : '#fff',
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <AntDesign
            name="left"
            size={scale(20)}
            color={theme.dark ? '#fff' : '#005DE0'}
          />

          <Text
            style={{
              color: theme.dark ? '#fff' : '#005DE0',
              fontSize: fontSizes.FONT20,
            }}
          >
            Back
          </Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.dark ? '#fff' : '#000' }]}>
          Settings
        </Text>
      </View>

      <ScrollView style={{ padding: scale(20) }}>
        <Text
          style={[
            styles.sectionHeader,
            { color: theme.dark ? '#fff' : '#000' },
          ]}
        >
          Push Notifications
        </Text>

        <SettingsSection
          text="Course Updates"
          value={courseUpdates}
          onChange={() => updatePreferences('courseUpdates')}
        />

        <SettingsSection
          text="Latest Updates"
          value={latestUpdates}
          onChange={() => updatePreferences('latestUpdates')}
        />

        <View style={styles.settingSection}>
          <Text
            style={[
              styles.sectionHeader,
              { color: theme.dark ? '#fff' : '#000' },
            ]}
          >
            Appearance
          </Text>

          <SettingsSection
            text="App Theme"
            value={theme.dark}
            onChange={toggleTheme}
          />
        </View>
      </ScrollView>

      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    marginTop: 10,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(25),
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(5),
    shadowOffset: { width: 0, height: 1 },
  },

  backBtn: { flexDirection: 'row', alignItems: 'center', gap: scale(5) },

  title: {
    width: scale(220),
    textAlign: 'center',
    fontSize: fontSizes.FONT22,
  },

  sectionHeader: {
    fontSize: fontSizes.FONT23,
    marginBottom: verticalScale(10),
    fontFamily: 'Poppins_600SemiBold',
  },

  settingSection: {
    marginBottom: verticalScale(30),
  },
});
