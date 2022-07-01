import React from 'react';
import {TodosContextProvider} from './src/hooks/useTodos';
import LottieView from 'lottie-react-native';

import space from './src/assets/space.json';
import {Todo} from './App.styles';
import Todos from './src/components/Todos/Todos';
import SyncButton from './src/components/SyncButton/SyncButton';
import Form from './src/components/Form/Form';

const App = () => {
  return (
    <TodosContextProvider>
      <Todo.SafeView>
        <LottieView source={space} resizeMode="center" autoPlay loop />
          <SyncButton />
          <Form />
          <Todos />
      </Todo.SafeView>
    </TodosContextProvider>
  );
};

export default App;
