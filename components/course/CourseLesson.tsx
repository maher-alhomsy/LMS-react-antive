import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

import { CourseData } from '@/types';
import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

const CourseLesson = ({ courseDetails }: { courseDetails: CourseData[] }) => {
  const { theme } = useTheme();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(
      courseDetails.map((item: CourseData) => item.videoSection)
    ),
  ];

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }

    setVisibleSections(newVisibleSections);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderRadius: 8,
          paddingVertical: verticalScale(5),
        }}
      >
        <View>
          {videoSections.map((item: string, index: number) => {
            const isSectionVisible = visibleSections.has(item);

            const sectionVideos = courseDetails?.filter(
              ({ videoSection }) => videoSection === item
            );

            return (
              <>
                <View
                  style={{
                    borderBottomColor: '#DCDCDC',
                    paddingVertical: verticalScale(5),
                    borderBottomWidth: !isSectionVisible ? 1 : 0,
                    marginBottom: !isSectionVisible ? verticalScale(5) : null,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        width: scale(265),
                        fontSize: fontSizes.FONT21,
                        fontFamily: 'Poppins_500Medium',
                        color: theme.dark ? '#fff' : '#000',
                      }}
                    >
                      {item}
                    </Text>

                    {isSectionVisible ? (
                      <TouchableOpacity
                        onPress={toggleSection.bind(null, item)}
                      >
                        <Entypo
                          size={scale(20)}
                          name="chevron-up"
                          color={theme.dark ? '#fff' : '#000'}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={toggleSection.bind(null, item)}
                      >
                        <Entypo
                          size={scale(20)}
                          name="chevron-down"
                          color={theme.dark ? '#fff' : '#000'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!isSectionVisible && (
                    <Text
                      style={{
                        fontSize: fontSizes.FONT18,
                        fontFamily: 'Poppins_400Regular',
                        color: theme.dark ? '#fff' : '#000',
                      }}
                    >
                      {sectionVideos?.length} Lessons
                    </Text>
                  )}
                </View>

                {isSectionVisible && (
                  <>
                    {sectionVideos.map((item: CourseData, index: number) => (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: '#E1E2E5',
                          marginVertical: verticalScale(5),
                        }}
                      >
                        <View style={styles.itemContainer}>
                          <View style={styles.itemContainerWrapper}>
                            <View style={styles.itemTitleWrapper}>
                              <Feather
                                name="video"
                                size={scale(16)}
                                color={theme.dark ? '#fff' : '#8a8a8a'}
                              />

                              <Text
                                style={[
                                  styles.itemTitleText,
                                  {
                                    width: scale(245),
                                    fontSize: fontSizes.FONT17,
                                    fontFamily: 'Poppins_500Medium',
                                    color: theme.dark ? '#fff' : '#525258',
                                  },
                                ]}
                              >
                                {item.title}
                              </Text>
                            </View>

                            <View style={styles.itemDataContainer}>
                              <Text
                                style={{
                                  marginRight: 6,
                                  fontSize: fontSizes.FONT17,
                                  fontFamily: 'Poppins_400Regular',
                                  color: theme.dark ? '#fff' : '#818181',
                                }}
                              >
                                {item.videoLength}{' '}
                                {parseInt(item?.videoLength) > 60
                                  ? 'hours'
                                  : 'minutes'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CourseLesson;

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 12,
    marginHorizontal: 10,
  },

  itemContainerWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemTitleWrapper: {
    flexDirection: 'row',
  },

  itemDataContainer: { flexDirection: 'row', alignItems: 'center' },

  itemTitleText: { marginLeft: 8, color: '#525258', fontSize: 16 },
});
