import { StyleSheet, Switch, Text, View } from 'react-native';

import { verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

type Props = {
  text: string;
  value: boolean;
  onChange: () => void;
};
const SettingsSection = ({ text, onChange, value }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.settingItem}>
      <Text
        style={[styles.normalText, { color: theme.dark ? '#fff' : '#000' }]}
      >
        {text}
      </Text>

      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

export default SettingsSection;

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
  },

  normalText: {
    opacity: 0.9,
    fontSize: fontSizes.FONT19,
    fontFamily: 'Poppins_500Medium',
  },
});
