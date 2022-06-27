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
import {useDispatch, useSelector} from 'react-redux';
import {answerCreate, qnaSelect} from '../../store/qna/qna';

const QnaListItem = ({item, setLoad}) => {
  const [answer, setAnswer] = useState({
    id: item.id,
    answer: '',
  });

  const dispatch = useDispatch();

  const onChangeAnswerHandler = async (key, value) => {
    await setAnswer({...answer, [key]: value});
  };

  const handleAnswerSubmit = e => {
    dispatch(answerCreate(answer));
    alert('답글 작성 완료');
    Keyboard.dismiss();
    setLoad(answer);
  };

  return (
    <>
      <View style={styles.inputRow}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeAnswerHandler('answer', value)}
            placeholderTextColor="white"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
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
    width: 250,
    borderColor: '#d6d9c6',
    borderWidth: 1,
    borderRadius: 20,
    color: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  item: {
    backgroundColor: '#D2E1C8',
    color: '#0D4212',
    padding: 15,
    fontSize: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    margin: 15,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'beige',
  },
});

export default QnaListItem;
