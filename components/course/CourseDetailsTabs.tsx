import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

type Props = {
  text: string;
  activeButton: string;
  onPress: (text: string) => void;
  reviewsFetchingHandler?: () => void;
};

const CourseDetailsTabs = ({
  text,
  onPress,
  activeButton,
  reviewsFetchingHandler,
}: Props) => {
  const { theme } = useTheme();

  const handlePress = async () => {
    if (text === 'Reviews') {
      onPress(text);
      reviewsFetchingHandler?.();
    } else onPress(text);
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor:
            activeButton === text
              ? '#2467EC'
              : theme.dark
              ? '#2A2D32'
              : 'transparent',
        },
      ]}
      onPress={handlePress}
    >
      <Text
        style={{
          fontSize: fontSizes.FONT20,
          fontFamily: 'Poppins_500Medium',
          color:
            activeButton === 'About' ? '#fff' : theme.dark ? '#ffff' : '#000',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CourseDetailsTabs;

const styles = StyleSheet.create({
  btn: {
    borderRadius: scale(50),
    justifyContent: 'center',
    height: verticalScale(32),
    paddingHorizontal: scale(25),
  },
});
