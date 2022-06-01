import React from 'react';
import {FlatList} from 'react-native';
import {ToDoItem} from '../../models/todo-item';
import {FLBasics} from './FlatListBasics.styles';

interface FlatListBasicsProps {
  todos: ToDoItem[];
}

const FlatListBasics = ({todos}: FlatListBasicsProps) => {
  return (
    <FLBasics.Container>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <FLBasics.Content>
            <FLBasics.Item>{item.todo}</FLBasics.Item>
          </FLBasics.Content>
        )}
      />
    </FLBasics.Container>
  );
};

export default React.memo(FlatListBasics);
