import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BlurView } from 'expo-blur';

import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';

const AuthModal = () => {
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Pressable style={styles.btn} onPress={(e) => e.stopPropagation()}>
        <Text
          style={{
            fontSize: fontSizes.FONT35,
            fontFamily: 'Poppins_700Bold',
          }}
        >
          Join to Becodemy
        </Text>

        <Text
          style={{
            fontSize: fontSizes.FONT17,
            paddingTop: windowHeight(5),
            fontFamily: 'Poppins_300Light',
          }}
        >
          It's easier than your imagination!
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: windowWidth(20),
            paddingVertical: windowHeight(10),
          }}
        >
          <Pressable>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/google.png')}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/github.png')}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.img}
              source={require('@/assets/images/onboarding/apple.png')}
            />
          </Pressable>
        </View>
      </Pressable>
    </BlurView>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    alignItems: 'center',
    width: windowWidth(420),
    justifyContent: 'center',
    height: windowHeight(250),
    backgroundColor: '#fff',
    marginHorizontal: windowWidth(50),
  },

  img: {
    resizeMode: 'contain',
    width: windowWidth(40),
    height: windowHeight(40),
  },
});
