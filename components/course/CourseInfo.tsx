import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

import { Benefits } from '@/types';
import { useTheme } from '@/context/theme.context';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

type Props = { prerequisites: Benefits[]; title: string };

const CourseInfo = ({ prerequisites, title }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={{ paddingTop: windowHeight(12) }}>
      <Text
        style={[
          styles.prerequisites,
          { color: theme.dark ? '#fff' : '#3E3B54' },
        ]}
      >
        Course {title}
      </Text>

      {prerequisites?.map((i: Benefits, index: number) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: windowHeight(5),
          }}
        >
          <Ionicons
            size={scale(17)}
            name="checkmark-done-outline"
            color={theme.dark ? '#fff' : '#000'}
          />

          <Text
            style={{
              marginLeft: windowWidth(5),
              fontSize: fontSizes.FONT18,
              color: theme.dark ? '#fff' : '#000',
            }}
          >
            {i?.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  prerequisites: {
    fontSize: fontSizes.FONT24,
    paddingTop: windowHeight(8),
    lineHeight: windowHeight(20),
    fontFamily: 'Poppins_600SemiBold',
  },
});
