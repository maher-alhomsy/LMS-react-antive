import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '@/context/theme.context';
import { fontSizes } from '@/themes/app.constant';

type Props = {
  text: string;
  isActive: boolean;
  onPress: () => void;
};
const FilterButton = ({ isActive, onPress, text }: Props) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: isActive
            ? '#705DF2'
            : theme.dark
            ? '#3c43485c'
            : '#f5f5f5',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.dark ? '#fff' : '#000' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  btn: {
    borderRadius: scale(5),
    marginRight: scale(20),
    padding: verticalScale(8),
  },

  text: {
    color: '#fff',
    fontSize: fontSizes.FONT18,
    fontFamily: 'Poppins_500Medium',
  },
});
