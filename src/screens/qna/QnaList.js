import React, {useEffect, useState} from 'react';
import QnaListItem from './QnaListItem';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

const QnaList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: '김치',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: '커피',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: '도넛',
          },
        ]}
        renderItem={({item, index, separators}) => (
          <QnaListItem item={item}></QnaListItem>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default QnaList;
