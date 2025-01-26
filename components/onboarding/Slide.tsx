import React, { useState } from 'react';

import {
  Text,
  View,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import {
  fontSizes,
  windowWidth,
  SCREEN_WIDTH,
  windowHeight,
} from '@/themes/app.constant';
import { onBoardingSlides } from '@/types';
import { HEIGHT, WIDTH } from '@/constants/data';
import AuthModal from '../auth/AuthModal';

type Props = {
  index: number;
  totalSlides: number;
  slide: onBoardingSlides;
  setIndex: (value: number) => void;
};

const Slide = ({ slide, index, setIndex, totalSlides }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (index === 2) {
      setModalVisible(true);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <Svg style={[StyleSheet.absoluteFill, { backgroundColor: slide.color }]}>
        <Defs>
          <RadialGradient id="gradiant" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>

        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={'url(#gradiant)'}
        />
      </Svg>

      <View style={styles.container}>
        <View>{slide.image}</View>

        <View>
          <View
            style={{
              width: SCREEN_WIDTH * 1,
              paddingHorizontal: verticalScale(25),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: '600',
                color: '#05030d',
                fontFamily: 'Poppins_600SemiBold',
              }}
            >
              {slide.title}
            </Text>

            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: '600',
                color: '#05030d',
                fontFamily: 'Poppins_600SemiBold',
              }}
            >
              {slide.secondTitle}
            </Text>

            <Text
              style={{
                paddingVertical: verticalScale(4),
                fontSize: fontSizes.FONT18,
                color: '#3e3b54',
                fontFamily: 'Poppins_300Light',
              }}
            >
              {slide.subTitle}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          ></TouchableOpacity>
        ))}
      </View>

      {index <= totalSlides - 1 && (
        <LinearGradient
          colors={['#6d55fe', '#8976fc']}
          style={styles.nextButton}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
            onPress={handlePress}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </LinearGradient>
      )}

      {index < totalSlides - 1 && (
        <TouchableOpacity onPress={handlePress} style={styles.arrowButton}>
          <Ionicons
            name="chevron-forward-outline"
            size={scale(18)}
            color="black"
          />
        </TouchableOpacity>
      )}

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((prev) => !prev);
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setModalVisible((prev) => !prev)}
        >
          <AuthModal setModalVisible={setModalVisible} />
        </Pressable>
      </Modal>
    </>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: scale(60),
    alignItems: 'center',
    paddingTop: verticalScale(100),
  },

  indicatorContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(35),
    position: 'absolute',
    bottom: verticalScale(55),
    left: scale(22),
  },

  indicator: {
    height: verticalScale(7),
    width: scale(18),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: scale(4),
    borderRadius: scale(4),
  },

  activeIndicator: {
    height: verticalScale(8),
    width: scale(40),
    backgroundColor: 'white',
  },

  nextButton: {
    position: 'absolute',
    zIndex: 9999999999,
    right: windowWidth(25),
    bottom: windowHeight(50),
    marginTop: windowHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth(140),
    height: windowHeight(37),
    borderRadius: windowWidth(20),
  },

  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.FONT22,
  },

  arrowButton: {
    position: 'absolute',
    width: scale(30),
    height: scale(30),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    right: moderateScale(5),
    top: Platform.OS === 'ios' ? verticalScale(345) : verticalScale(385),
    transform: [{ translateY: -30 }],
  },
});
