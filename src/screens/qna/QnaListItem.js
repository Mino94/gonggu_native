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
import {answerCreate, qnaCreate} from '../../store/qna/qna';

const QnaListItem = ({item}) => {
  const [answer, setAnswer] = useState({
    id: item.id,
    answer: '',
  });

  const dispatch = useDispatch();

  const onChangeHandler = async (key, value) => {
    await setAnswer({...answer, [key]: value});
  };

  const handleSubmit = e => {
    dispatch(answerCreate(answer));
    alert('답글 작성 완료');
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.inputRow}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeHandler('answer', value)}
            placeholder="질문 작성"
            placeholderTextColor="white"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  inputRow: {
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  answer: {
    backgroundColor: '#F7F4E3',
    color: 'black',
    padding: 15,
    fontSize: 15,
  },
});

export default QnaListItem;
