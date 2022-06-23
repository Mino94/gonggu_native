import React from 'react';
import {Button, Text, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>HOME</Text>
      <Button
        title="QnaList 열기"
        onPress={() => navigation.navigate('QnaList')}
      />
    </View>
  );
};

export default Home;
