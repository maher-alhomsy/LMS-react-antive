import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { scale, verticalScale } from 'react-native-size-matters';

import useUserData from '@/hooks/useUserData';
import { useTheme } from '@/context/theme.context';
import { fontSizes } from '@/themes/app.constant';

type Props = {
  title: string;
  message: string;
  status: string;
};
const NotificationItem = ({ message, status, title }: Props) => {
  const { theme } = useTheme();
  const { avatar } = useUserData();

  return (
    <Swipeable
      renderRightActions={() => (
        <Pressable style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={scale(25)} color="#fff" />
        </Pressable>
      )}
    >
      <Pressable
        style={[
          styles.notificationItem,
          {
            backgroundColor:
              status === 'Unread'
                ? theme.dark
                  ? '#3c4385c'
                  : '#f1f1f1'
                : theme.dark
                ? '#101010'
                : '#fff',
          },
        ]}
      >
        {avatar && (
          <Image
            width={scale(50)}
            height={scale(50)}
            source={{ uri: avatar }}
            borderRadius={scale(100)}
            style={{ marginRight: verticalScale(8) }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.notificationText,
              {
                fontWeight: '500',
                fontSize: fontSizes.FONT18,
                fontFamily: 'Poppins_500Medium',
                color: theme.dark ? '#fff' : '#000',
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.notificationText,
              { color: theme.dark ? '#fff' : '#333' },
            ]}
          >
            {message}
          </Text>

          <Text
            style={[
              styles.notificationText,
              {
                opacity: 0.8,
                color: theme.dark ? '#fff' : '#333',
              },
            ]}
          >
            2 days ago
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  deleteButton: {
    height: '100%',
    width: scale(50),
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  notificationItem: {
    padding: scale(14),
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
  },

  notificationText: {
    flex: 1,
    color: '#333',
    fontSize: fontSizes.FONT17,
    fontFamily: 'Poppins_400Regular',
  },
});
