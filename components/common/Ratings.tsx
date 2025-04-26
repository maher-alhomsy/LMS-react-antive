import { Text, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

const Ratings = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <View style={{ marginLeft: 5 }}>
          <FontAwesome name="star" size={24} color="#F6B100" />
        </View>
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <View>
          <FontAwesome name="star-half-empty" size={24} color="#F6B100" />
        </View>
      );
    } else {
      stars.push(
        <View>
          <FontAwesome name="star-o" size={24} color="#F6B100" />
        </View>
      );
    }
  }

  return <Text>{stars}</Text>;
};

export default Ratings;
