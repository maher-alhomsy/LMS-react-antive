import { StyleSheet, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = ({ text, styles }: { text: string; styles: any }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles, { backgroundColor: 'transparent' }]}>{text}</Text>
      }
    >
      <LinearGradient
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        colors={['#6D55FE', '#8976FC']}
      >
        <Text style={[styles, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

const styles = StyleSheet.create({});
