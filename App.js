import React from 'react';
import store from './src/store/store';
import QnaNavigation from './src/screens/navigation/QnaNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <QnaNavigation />
    </Provider>
  );
};

export default App;
