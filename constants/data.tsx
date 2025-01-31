import { Dimensions, Image } from 'react-native';

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

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const NEXT = 0;
export const PREV = WIDTH;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

export const bannerData = [
  {
    image:
      'https://res.cloudinary.com/dkg6jv4l0/image/upload/v1729365053/WhatsApp_Image_2024-09-02_at_2.07.32_PM_kb1mwe.jpg',
    url: 'https://react-native.becodemy.com',
  },
  {
    image:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574008/WhatsApp_Image_2024-02-29_at_2.00.10_AM_zpk4qe.jpg',
    url: 'https://youtu.be/BrrwtCt7d-Y',
  },
  {
    image:
      'https://res.cloudinary.com/dkg6jv4l0/image/upload/v1723424082/WhatsApp_Image_2024-08-09_at_5.00.52_AM_wzokd1.jpg',
    url: 'https://youtu.be/4aS7g8OYHbg',
  },
];

export const videoLessonsData = [
  {
    url: 'https://youtu.be/hGB-6VAcM6U',
    thumbnail:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1717660359/WhatsApp_Image_2024-06-04_at_4.31.27_AM_afd4bw.jpg',
    title:
      'All Functional LMS mobile App with React Native,Expo,Typescript,Express js',
  },
  {
    url: 'https://youtu.be/BrrwtCt7d-Y',
    thumbnail:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574008/WhatsApp_Image_2024-02-29_at_2.00.10_AM_zpk4qe.jpg',

    title:
      'SaaS Email Newsletter platform by using next14, typescript, AWS SES, AstraDb, Stripe',
  },
  {
    url: 'https://youtu.be/mzbOqy5DWzE',
    thumbnail:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574100/AI_Prompt_Selling_Marketplace_with_next_13.5_Full_Project_ezvziv.png',
    title:
      'SaaS Email Newsletter platform by using next14, typescript, AWS SES, AstraDb, Stripe',
  },
  {
    url: 'https://youtu.be/UxirFATvWTo',
    thumbnail:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574204/Food_Delivery_Web_App_anntu1.png',
    title:
      'Food Delivery Web Application using Microservice Architecture with Nest.js,GraphQL,Next.js',
  },
  {
    url: 'https://youtu.be/h4dW5LNtcoE',
    thumbnail:
      'https://res.cloudinary.com/dwp4syk3r/image/upload/v1713574236/Let_s_Build_a_Full-stack_website_without_backend_ny0lcl.png',
    title:
      "Let's Make a Full-stack Website Without a Backend Next 14 | OneEntry CMS | Tailwind css | Typescript",
  },
  {
    url: 'https://youtu.be/4aS7g8OYHbg',
    thumbnail:
      'https://res.cloudinary.com/dkg6jv4l0/image/upload/v1723424082/WhatsApp_Image_2024-08-09_at_5.00.52_AM_wzokd1.jpg',
    title:
      "Let's build one real-time car booking full-stack mobile app by using Expo React Native",
  },
];
