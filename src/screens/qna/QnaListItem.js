import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const QnaListItem = ({item}) => {
  const [selectedId, setSelectedId] = useState(null);

  const backgroundColor = item.id === selectedId ? '#6ab04c' : '#D2E1C8';
  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <Item
      item={item}
      onPress={() => setSelectedId(item.id)}
      backgroundColor={{backgroundColor}}
      textColor={{color}}
    />
  );
};

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 10,
  },
});

export default QnaListItem;
