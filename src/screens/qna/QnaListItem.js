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
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // const handleSubmit = (e) => {
  //   dispatch(answerCreate({ id: item.id, answer: value }));
  //   setVisible(!visible);
  //   setValue("");
  // };

  return (
    <>
      <View style={styles.inputRow}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeHandler('question', value)}
            placeholder="질문 작성"
            placeholderTextColor="white"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}>
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
