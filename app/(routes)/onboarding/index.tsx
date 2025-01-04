import { useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Slide from '@/components/onboarding/Slide';
import Slider from '@/components/onboarding/Slider';
import { onBoardingSlidesData } from '@/constants/data';

const Page = () => {
  const [index, setIndex] = useState(0);

  const prev = onBoardingSlidesData[index - 1];
  const next = onBoardingSlidesData[index + 1];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={
          prev && (
            <Slide
              slide={prev}
              index={index}
              setIndex={setIndex}
              totalSlides={onBoardingSlidesData.length}
            />
          )
        }
        next={
          next && (
            <Slide
              slide={next}
              index={index}
              setIndex={setIndex}
              totalSlides={onBoardingSlidesData.length}
            />
          )
        }
      >
        <Slide
          index={index}
          setIndex={setIndex}
          slide={onBoardingSlidesData[index]}
          totalSlides={onBoardingSlidesData.length}
        />
      </Slider>
    </GestureHandlerRootView>
  );
};

export default Page;
