import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {answerCreate} from '../../store/qna/qna';

const QnaListItem = ({item}) => {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.row}>
      <View>
        <Text style={[styles.answer]}>{item.answer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answer: {
    backgroundColor: '#F7F4E3',
    color: 'black',
    padding: 15,
    fontSize: 15,
  },
});

export default QnaListItem;
