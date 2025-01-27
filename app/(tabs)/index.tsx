import { Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>HOME</Text>
    </SafeAreaView>
  );
};

export default Home;
