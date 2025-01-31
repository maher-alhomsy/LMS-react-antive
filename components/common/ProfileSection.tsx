import { Pressable, StyleSheet, Text, View } from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

type Props = {
  title: string;
  subTitle: string;
  onPress?: () => void;
  icon: React.ReactNode;
};
const ProfileSection = ({ icon, subTitle, title, onPress }: Props) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.iconWrapper}>{icon}</View>

        <View>
          <Text style={[styles.title, { color: theme.dark ? '#fff' : '#000' }]}>
            {title}
          </Text>

          <Text
            style={[styles.subTitle, { color: theme?.dark ? '#fff' : '#000' }]}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },

  iconWrapper: {
    borderWidth: 1,
    width: scale(38),
    height: scale(38),
    alignItems: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    borderColor: '#E2DDFF',
  },

  title: {
    marginLeft: scale(10),
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_400Regular',
  },

  subTitle: {
    opacity: 0.6,
    marginLeft: scale(10),
    fontSize: fontSizes.FONT15,
    fontFamily: 'Poppins_400Regular',
  },
});
