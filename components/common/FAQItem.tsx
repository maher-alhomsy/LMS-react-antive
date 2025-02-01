import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

type Props = {
  answer: string;
  question: string;
  id: number;
  onPress: () => void;
  activeQuestion: number | null;
};
const FAQItem = ({ answer, id, question, activeQuestion, onPress }: Props) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.list,
        { backgroundColor: theme.dark ? '#3c43485c' : '#eaf3fb85' },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={[styles.question, { color: theme.dark ? '#fff' : '#000' }]}
        >
          {question}
        </Text>

        <View style={{ paddingRight: scale(5) }}>
          <Pressable onPress={onPress}>
            {activeQuestion === id ? (
              <AntDesign
                name="up"
                size={scale(20)}
                color={theme.dark ? '#fff' : '#000'}
              />
            ) : (
              <AntDesign
                name="down"
                size={scale(20)}
                color={theme.dark ? '#fff' : '#000'}
              />
            )}
          </Pressable>
        </View>
      </View>

      {activeQuestion === id && (
        <Text style={[styles.answer, { color: theme.dark ? '#fff' : '#000' }]}>
          {answer}
        </Text>
      )}
    </View>
  );
};

export default FAQItem;

const styles = StyleSheet.create({
  list: {
    width: scale(310),
    borderRadius: scale(10),
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(8),
  },

  question: {
    width: scale(260),
    fontSize: fontSizes.FONT20,
    fontFamily: 'Poppins_500Medium',
  },

  answer: {
    width: scale(260),
    fontSize: fontSizes.FONT18,
    paddingTop: verticalScale(5),
    fontFamily: 'Poppins_400Regular',
  },
});
