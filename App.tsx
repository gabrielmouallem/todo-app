import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTodos} from './src/hooks/useTodos';
import {getDocs} from './src/services/firebase/firebase-service';
import LottieView from 'lottie-react-native';

import space from './src/assets/space.json';
import {Todo} from './App.styles';
import FlatListBasics from './src/components/FlatListBasics/FlatListBasics';
import SyncButton from './src/components/SyncButton/SyncButton';

const App = () => {
  const {todos, loadDataCallback} = useTodos();

  useEffect(() => {
    loadDataCallback();
    getDocs()
      .then(res => console.log({res}))
      .catch(err => console.log({err}));
  }, []);

  useEffect(() => {
    console.log({todos});
  }, [todos]);

  return (
    <Todo.SafeView>
      <LottieView source={space} resizeMode="center" autoPlay loop />
      <View>
        <SyncButton />
      </View>
      <Todo.Container>
        <FlatListBasics todos={todos} />
      </Todo.Container>
    </Todo.SafeView>
  );
};

export default App;
