import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import QnaListItem from './QnaListItem';
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {qnaCreate, qnaSelect} from '../../store/qna/qna';
import {answerSelect} from '../../store/qna/answer';
import {useIsFocused} from '@react-navigation/native';
import {set} from 'immer/dist/internal';

const QnaList = () => {
  const qna = useSelector(state => state.qna);
  const [load, setLoad] = useState('');
  const [question, setQuestion] = useState({
    boardId: 1,
    questionId: 1,
    question: '',
    answer: '',
  });
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(qnaSelect());
  }, [load]);

  const handleSubmit = () => {
    setVisible(!visible);
  };

  const handleQnaCreateSubmit = async e => {
    await dispatch(qnaCreate(question));
    Keyboard.dismiss();
    setLoad(question);
    alert('댓글 작성이 완료되었습니다.');
  };

  const onChangeHandler = async (key, value) => {
    await setQuestion({...question, [key]: value});
  };

  const handleAnswerCreateSubmit = e => {
    dispatch(answerCreate({id: boardId, answer: value}));
    setVisible(!visible);
    setValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{borderWidth: 2, borderColor: 'black'}}>
        <FlatList
          data={qna.data}
          renderItem={({item}) => (
            <>
              <View style={styles.row}>
                <View>
                  <Text style={[styles.question]}>{item.question}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text>답글</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {visible ? (
                <View></View>
              ) : (
                <View style={styles.inputRow}>
                  <View>
                    <TextInput
                      style={styles.input}
                      onChangeText={value => onChangeHandler('answer', value)}
                      placeholder="답변 작성"
                      placeholderTextColor="white"
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={handleAnswerCreateSubmit}
                      style={styles.button}>
                      <Text>등록</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>

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
            onPress={handleQnaCreateSubmit}
            style={styles.button}>
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 10,
  },
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
  row: {
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#D2E1C8',
    color: '#0D4212',
    padding: 15,
    fontSize: 15,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
});

export default QnaList;
