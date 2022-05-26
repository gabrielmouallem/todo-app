
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useTodos} from './src/hooks/useTodos';
import {getTodos} from './src/services/firebase-service';

const App = () => {
  const {todos, loadDataCallback} = useTodos();

  React.useEffect(() => {
    loadDataCallback();
    getTodos()
      .then(res => console.log({res}))
      .catch(err => console.log({err}));
  }, []);

  React.useEffect(() => {
    console.log({todos});
  }, [todos]);

  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

export default App;
