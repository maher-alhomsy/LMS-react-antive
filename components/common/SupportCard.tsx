import { Pressable, StyleSheet, Text, View } from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '@/context/theme.context';
import { fontSizes, IsHaveNotch, IsIPAD } from '@/themes/app.constant';

type Props = {
  title: string;
  subTitle: string;
  onPress?: () => void;
  icon: React.ReactNode;
};
const SupportCard = ({ icon, subTitle, title, onPress }: Props) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: theme.dark ? '#3c43485c' : '#eaf3fb85' },
      ]}
    >
      {icon}

      <View>
        <Text
          style={[styles.cardTitle, { color: theme.dark ? '#fff' : '#000' }]}
        >
          {title}
        </Text>

        <Text
          style={[styles.cardSubTitle, { color: theme.dark ? '#fff' : '#000' }]}
        >
          {subTitle}
        </Text>
      </View>
    </Pressable>
  );
};

export default SupportCard;

const styles = StyleSheet.create({
  btn: {
    height: !IsHaveNotch
      ? verticalScale(65)
      : IsIPAD
      ? verticalScale(80)
      : verticalScale(62),
    gap: scale(10),
    shadowRadius: 5,
    shadowOpacity: 0.1,
    padding: scale(10),
    flexDirection: 'row',
    borderRadius: scale(10),
    shadowColor: '#40E0D0',
    marginTop: verticalScale(20),
  },

  cardTitle: {
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_500Medium',
  },

  cardSubTitle: {
    fontSize: fontSizes.FONT20,
    paddingTop: verticalScale(1),
    fontFamily: 'Poppins_400Regular',
  },
});
