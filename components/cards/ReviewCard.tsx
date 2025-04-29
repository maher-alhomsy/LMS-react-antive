import { View, Text, Image, StyleSheet } from 'react-native';

import moment from 'moment';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { scale, verticalScale } from 'react-native-size-matters';

import { Reviews } from '@/types';
import Ratings from '@/components/common/Ratings';
import { fontSizes } from '@/themes/app.constant';
import { useTheme } from '@/context/theme.context';

export default function ReviewCard({ item }: { item: Reviews }) {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: scale(40),
            height: scale(40),
            borderRadius: scale(100),
          }}
          source={{
            uri:
              item?.user?.avatar ||
              'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
          }}
        />
        <View style={{ marginHorizontal: verticalScale(7), flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text
                  style={{
                    fontSize: scale(16),
                    color: theme.dark ? '#fff' : '#000',
                  }}
                >
                  {item?.user?.name}
                </Text>

                <View style={{ marginTop: verticalScale(3) }}>
                  <Ratings rating={item?.rating} />
                </View>

                <Text
                  style={[
                    styles.commentText,
                    { color: theme.dark ? '#fff' : '#000' },
                  ]}
                >
                  {item.comment}
                </Text>

                <Text
                  style={[
                    styles.createdAt,
                    { color: theme.dark ? '#fff' : '#000' },
                  ]}
                >
                  {moment(item.createdAt).fromNow()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* replies */}
      {item?.replies?.length !== 0 && (
        <View style={styles.repliesContainer}>
          <Image
            style={styles.repliesImage}
            source={{
              uri:
                item.replies[0]?.user?.avatar ||
                'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
            }}
          />

          <View style={{ marginHorizontal: verticalScale(6), flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text
                    style={[
                      styles.repliesText,
                      { color: theme.dark ? '#fff' : '#000' },
                    ]}
                  >
                    {item.replies[0]?.user?.name}{' '}
                    <MaterialIcons
                      name="verified"
                      size={scale(16)}
                      color="#0095F6"
                    />
                  </Text>

                  <Text
                    style={[
                      styles.reply,
                      { color: theme.dark ? '#fff' : '#000' },
                    ]}
                  >
                    {item?.replies[0]?.reply}
                  </Text>

                  <Text
                    style={[
                      styles.repliesCreatedAt,
                      { color: theme.dark ? '#fff' : '#000' },
                    ]}
                  >
                    {moment(item?.replies[0]?.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentText: {
    fontSize: fontSizes.FONT16,
    paddingHorizontal: scale(3),
    paddingVertical: verticalScale(4),
  },

  createdAt: {
    opacity: 0.8,
    fontSize: fontSizes.FONT16,
    paddingHorizontal: scale(3),
    paddingVertical: verticalScale(3),
  },

  repliesContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginLeft: verticalScale(20),
  },

  repliesImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(100),
  },

  repliesText: {
    fontSize: scale(16),
    alignItems: 'center',
  },

  reply: {
    fontSize: fontSizes.FONT16,
    paddingHorizontal: scale(3),
    paddingVertical: verticalScale(3),
  },

  repliesCreatedAt: {
    opacity: 0.8,
    fontSize: fontSizes.FONT16,
    paddingHorizontal: scale(3),
    paddingVertical: verticalScale(3),
  },
});
