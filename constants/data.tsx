import { Image } from 'react-native';

import { onBoardingSlides } from '@/types';
import { IsIPAD } from '@/themes/app.constant';

import { scale, verticalScale } from 'react-native-size-matters';

const One = require('@/assets/images/onboarding/1.png');
const Two = require('@/assets/images/onboarding/2.png');
const Three = require('@/assets/images/onboarding/3.png');

export const onBoardingSlidesData: onBoardingSlides[] = [
  {
    title: 'Explore',
    color: '#40e0d0',
    secondTitle: 'Our Community',
    subTitle:
      'Find the perfect course to enhance your career prospects and skill set',
    image: (
      <Image
        source={One}
        style={{
          width: IsIPAD ? verticalScale(285) : verticalScale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
  },

  {
    title: 'Set Your',
    color: '#A7F893',
    image: (
      <Image
        source={Two}
        style={{
          width: IsIPAD ? scale(285) : scale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
    secondTitle: 'Own Goal',
    subTitle:
      'Personalize your study plan with flexible timelines that suit you best',
  },
  {
    color: '#FFC0CB',
    image: (
      <Image
        source={Three}
        style={{
          width: IsIPAD ? scale(285) : scale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
    secondTitle: 'Course',
    title: 'Complete full',
    subTitle:
      'Achieve certification by completing courses with dedicated effort',
  },
];
