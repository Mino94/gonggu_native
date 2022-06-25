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
import {answerCreate, qnaCreate, qnaSelect} from '../../store/qna/qna';
import {useIsFocused} from '@react-navigation/native';

const QnaList = () => {
  const qna = useSelector(state => state.qna);
  const [load, setLoad] = useState('');
  const [visible, setVisible] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const [question, setQuestion] = useState({
    boardId: 1,
    questionId: 1,
    question: '',
  });

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(qnaSelect());
  }, [load]);

  const handleQnaCreateSubmit = e => {
    dispatch(qnaCreate(question));
    Keyboard.dismiss();
    alert('댓글 작성이 완료되었습니다.');
    setLoad(question);
  };

  const onChangeHandler = async (key, value) => {
    await setQuestion({...question, [key]: value});
  };

  // answer
  const [answer, setAnswer] = useState({
    id: '3',
    answer: '',
  });

  const onChangeAnswerHandler = async (key, value) => {
    await setAnswer({...answer, [key]: value});
    console.log(answer);
  };

  const handleAnswerSubmit = e => {
    dispatch(answerCreate(answer));
    Keyboard.dismiss();
    alert('답글 작성이 완료되었습니다.');
    setLoad(answer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                    onPress={() => setSelectedId(item.id)}
                    style={styles.button}>
                    <Text>{visible ? '답변' : '취소'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {item.id === selectedId ? (
                item.answer === null ? (
                  <View style={styles.inputRow2}>
                    <View>
                      <TextInput
                        style={styles.input2}
                        onChangeText={value =>
                          onChangeAnswerHandler('answer', value)
                        }
                        placeholder="질문 작성"
                        placeholderTextColor="#8a9a7f"
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleAnswerSubmit}>
                        <Text>등록</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <QnaListItem item={item} />
                  </View>
                )
              ) : null}
            </>
          )}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </ScrollView>
      <View style={styles.inputRow}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeHandler('question', value)}
            placeholder="질문 작성"
            placeholderTextColor="#8a9a7f"
          />
          <TouchableOpacity
            onPress={handleQnaCreateSubmit}
            style={styles.button2}>
            <Text style={{color: '#F7F4E3', paddingLeft: 130}}>등록</Text>
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
  //input은 하단 질문 답변 창임
  input: {
    paddingLeft: 20,
    margin: 15,
    height: 40,
    width: 300,
    backgroundColor: 'white',
    color: '#8a9a7f',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    borderTopWidth: 1,
    borderTopColor: '#8a9a7f',
    backgroundColor: '#D2E1C8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  //input2는 위에 질문 바로 밑에임
  input2: {
    marginBottom: 15,
    marginLeft: 5,
    marginTop: 15,
    height: 40,
    width: 200,
    backgroundColor: 'white',
    color: '#8a9a7f',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow2: {
    height: 60,
    width: 340,
    margin: 10,
    borderWidth: 2,
    borderColor: '#b1b9ac',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    margin: 10,
    backgroundColor: '#D2E1C8',
    color: '#0D4212',
    padding: 15,
    fontSize: 15,

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
    borderRadius: 20,
  },
  button: {
    width: 60,
    height: 40,
    paddingLeft: 18,
    padding: 10,
    borderRadius: 25,

    backgroundColor: '#F7F4E3',
  },
  button2: {
    backgroundColor: '#8a9a7f',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 30,
    alignItems: 'center',
    width: 300,
    color: '#F7F4E3',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default QnaList;
