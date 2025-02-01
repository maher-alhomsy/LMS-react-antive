import { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';

import { FAQData } from '@/constants/data';
import { fontSizes } from '@/themes/app.constant';
import FAQItem from '@/components/common/FAQItem';
import { useTheme } from '@/context/theme.context';
import IconFour from '@/assets/svgs/support-center/four';

const Page = () => {
  const { theme } = useTheme();

  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? '#101010' : '#fff' }}>
      <LinearGradient
        style={styles.linear}
        colors={!theme.dark ? ['#FAE0BC', '#FAE0BC'] : ['#8673FC', '#8673FC']}
      >
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        <Text
          style={[styles.title, { color: theme.dark ? '#fff' : '#807F7F' }]}
        >
          FAQ's
        </Text>

        <IconFour />
      </LinearGradient>

      <View style={{ padding: scale(20) }}>
        <View>
          <AntDesign
            name="search1"
            size={scale(19)}
            style={styles.icon}
            color={theme.dark ? '#fff' : '#000'}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: theme.dark ? '#D9D9D9' : '#000',
                borderColor: theme.dark ? '#D9D9D9' : '#000',
              },
            ]}
            placeholder="Search for Topics!"
            placeholderTextColor={theme.dark ? '#D9D9D9' : '#000'}
          />
        </View>

        <View style={{ paddingTop: scale(10) }}>
          <FlatList
            data={FAQData}
            renderItem={({ item }) => (
              <FAQItem
                {...item}
                activeQuestion={activeQuestion}
                onPress={() => toggleQuestion(item.id)}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  linear: {
    overflow: 'hidden',
    height: verticalScale(200),
    borderBottomLeftRadius: scale(35),
    borderBottomRightRadius: scale(35),
  },

  btn: {
    zIndex: 1,
    left: scale(10),
    width: scale(35),
    height: scale(35),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(5),
    top: verticalScale(32),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
    fontSize: fontSizes.FONT28,
    paddingTop: verticalScale(45),
    fontFamily: 'Poppins_600SemiBold',
  },

  icon: {
    left: scale(10),
    position: 'absolute',
    top: verticalScale(9),
  },

  input: {
    borderWidth: 1,
    paddingLeft: scale(32),
    borderRadius: scale(20),
    height: verticalScale(35),
    fontSize: fontSizes.FONT20,
  },
});
