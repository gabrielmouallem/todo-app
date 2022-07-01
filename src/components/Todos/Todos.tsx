import React from 'react';
import {ScrollView} from 'react-native';
import { Todos as Todo } from './Todos.styles';
import TodoItem from './components/TodoItem';
import {useTodos} from '../../hooks/useTodos';
import {useSync} from '../../hooks/useSync';
import {useNetInfo} from '@react-native-community/netinfo';

const Todos = () => {
  const {todos, loadDataCallback} = useTodos();
  const {syncUpData, syncDownData} = useSync();
  const {isConnected} = useNetInfo();

  React.useEffect(() => {
    loadDataCallback();
  }, []);

  React.useEffect(() => {
    if (isConnected) {
      syncUpData();
      syncDownData();
    }
  }, [isConnected]);

  return (
    <Todo.Container>
      <ScrollView>
        {todos.map(item => (
          <TodoItem item={item} />
        ))}
      </ScrollView>
    </Todo.Container>
  );
};

export default React.memo(Todos);
