import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {qnaCreate} from '../../store/qna/qna';

const QnaListItem = ({item}) => {
  return (
    <>
      <Text style={[styles.question]}>{item.question}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    backgroundColor: '#D2E1C8',
    color: '#0D4212',
    padding: 15,
    fontSize: 15,
  },
  answer: {
    backgroundColor: '#F7F4E3',
    color: 'black',
    padding: 15,
    fontSize: 15,
  },
});

export default QnaListItem;
