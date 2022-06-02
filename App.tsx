import React from 'react';
import {TodosContextProvider} from './src/hooks/useTodos';
import LottieView from 'lottie-react-native';

import space from './src/assets/space.json';
import {Todo} from './App.styles';
import FlatListBasics from './src/components/FlatListBasics/FlatListBasics';
import SyncButton from './src/components/SyncButton/SyncButton';
import Form from './src/components/Form/Form';

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
