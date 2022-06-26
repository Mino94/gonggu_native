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
import {useIsFocused} from '@react-navigation/native';

const QnaList = () => {
  const qna = useSelector(state => state.qna);
  const [load, setLoad] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [visible, setVisible] = useState(true);

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
                item.answer !== null ? (
                  <View>
                    <Text style={[styles.answer]}>{item.answer}</Text>
                  </View>
                ) : (
                  <View>
                    <QnaListItem item={item} setLoad={setLoad} />
                  </View>
                )
              ) : null}
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
  answer: {
    backgroundColor: '#d6d9c6',
    color: 'black',
    padding: 15,
    margin: 10,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    width: 250,
    borderColor: '#d6d9c6',
    borderWidth: 1,
    borderRadius: 20,
    color: 'white',
  },
  inputRow: {
    backgroundColor: '#34532d',
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#8a9a7f',
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

export default QnaList;
