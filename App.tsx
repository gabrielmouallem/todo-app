import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTodos} from './src/hooks/useTodos';
import LottieView from 'lottie-react-native';

import space from './src/assets/space.json';
import {Todo} from './App.styles';
import FlatListBasics from './src/components/FlatListBasics/FlatListBasics';
import SyncButton from './src/components/SyncButton/SyncButton';
import { useSync } from './src/hooks/useSync';
import Form from './src/components/Form/Form';

const App = () => {
  const {todos, loadDataCallback} = useTodos();
  const {syncUpData} = useSync();

  useEffect(() => {
    syncUpData();
    loadDataCallback();
  }, []);

  useEffect(() => {
    console.log("-----> Local Todos: ", todos);
  }, [todos]);

  return (
    <Todo.SafeView>
      <LottieView source={space} resizeMode="center" autoPlay loop />
      <View>
        <SyncButton />
      </View>
      <View>
        <Form ></Form>
      </View>
      <Todo.Container>
        <FlatListBasics todos={todos} />
      </Todo.Container>
    </Todo.SafeView>
  );
};

export default App;
