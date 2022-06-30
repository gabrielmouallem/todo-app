import React from 'react';
import { TodosContextProvider } from '../hooks/useTodos';
import LottieView from 'lottie-react-native';

import space from '../assets/space.json';
import { Todo } from './App.styles';
import FlatListBasics from '../components/FlatListBasics/FlatListBasics';
import SyncButton from '../components/SyncButton/SyncButton';
import Form from '../components/Form/Form';

const App = () => {
  return (
    <TodosContextProvider>
      <Todo.SafeView>
        <LottieView source={space} resizeMode="center" autoPlay loop />
        <SyncButton />
        <Form />
        <FlatListBasics />
      </Todo.SafeView>
    </TodosContextProvider>
  );
};

export default App;
