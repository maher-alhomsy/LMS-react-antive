import { useState } from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { useTheme } from '@/context/theme.context';
import { scale, verticalScale } from 'react-native-size-matters';
import { fontSizes } from '@/themes/app.constant';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const TicketModal = ({ isOpen, onClose }: Props) => {
  const { theme } = useTheme();

  const [loader, setLoader] = useState(false);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <BlurView style={styles.blur} intensity={90}>
          <Pressable
            style={[
              styles.modalBtn,
              { backgroundColor: theme.dark ? '#101010' : '#fff' },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: theme.dark ? '#fff' : '#000' },
              ]}
            >
              Create Ticket
            </Text>

            <View>
              <Text
                style={[styles.ticket, { color: theme.dark ? '#fff' : '#333' }]}
              >
                Ticket Title *
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.dark ? '#fff' : '#000',
                    borderColor: theme.dark ? '#fff' : '#000',
                  },
                ]}
                value={ticketTitle}
                onChangeText={(e) => setTicketTitle(e)}
                placeholder="I am encountering **** this problem"
                placeholderTextColor={theme.dark ? '#fff' : '#000'}
              />
            </View>

            <View>
              <Text
                style={[
                  styles.description,
                  { color: theme.dark ? '#fff' : '#000' },
                ]}
              >
                Ticket Description *
              </Text>

              <TextInput
                style={[
                  styles.secoundInput,
                  {
                    color: theme.dark ? '#fff' : '#000',
                    borderColor: theme.dark ? '#fff' : '#333',
                  },
                ]}
                multiline={true}
                numberOfLines={6}
                value={ticketDescription}
                onChangeText={(e) => setTicketDescription(e)}
                placeholder="Problem explaination with details..."
                placeholderTextColor={theme.dark ? '#fff' : '#000'}
              />
            </View>

            <TouchableOpacity style={styles.loaderWrapper}>
              {loader ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.submit}>Create</Text>
              )}
            </TouchableOpacity>
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
};

export default TicketModal;

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBtn: {
    width: scale(300),
    padding: scale(15),
    borderRadius: scale(10),
    marginHorizontal: scale(50),
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: fontSizes.FONT35,
    fontFamily: 'Poppins_600SemiBold',
  },

  ticket: {
    fontSize: fontSizes.FONT20,
    paddingTop: verticalScale(5),
    fontFamily: 'Poppins_500Medium',
  },

  input: {
    borderWidth: 1,
    paddingLeft: scale(10),
    borderRadius: scale(5),
    height: verticalScale(30),
    fontSize: fontSizes.FONT18,
    marginVertical: verticalScale(5),
  },

  description: {
    fontSize: fontSizes.FONT20,
    paddingTop: verticalScale(10),
    fontFamily: 'Poppins_500Medium',
  },

  secoundInput: {
    borderWidth: 1,
    borderRadius: scale(5),
    paddingLeft: scale(10),
    textAlignVertical: 'top',
    height: verticalScale(80),
    fontSize: fontSizes.FONT18,
    paddingTop: verticalScale(5),
    marginVertical: verticalScale(5),
  },

  loaderWrapper: {
    borderRadius: scale(8),
    backgroundColor: '#2467EC',
    marginTop: verticalScale(15),
    paddingVertical: verticalScale(8),
  },

  submit: {
    color: '#FFFF',
    textAlign: 'center',
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_600SemiBold',
  },
});
