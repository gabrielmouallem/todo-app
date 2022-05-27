import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTodos} from './src/hooks/useTodos';
import {getDocs} from './src/services/firebase/firebase-service';

const App = () => {
  const {todos, loadDataCallback} = useTodos();

  React.useEffect(() => {
    loadDataCallback();
    getDocs()
      .then(res => console.log({res}))
      .catch(err => console.log({err}));
  }, []);

  React.useEffect(() => {
    console.log({todos});
  }, [todos]);

  return (
    <SafeAreaView>
      <View>
        <Text>TODO App</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
