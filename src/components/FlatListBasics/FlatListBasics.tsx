import React from 'react';
import {FlatList} from 'react-native';
import {ToDoItem} from '../../models/todo-item';
import {FLBasics} from './FlatListBasics.styles';
import FlatListItem from './components/FlatListItem';
interface FlatListBasicsProps {
  todos: ToDoItem[];
}

const FlatListBasics = ({todos}: FlatListBasicsProps) => {

  return (
    <FLBasics.Container>
      <FlatList
        data={todos}
        renderItem={({item}) => <FlatListItem item={item} />}
      />
    </FLBasics.Container>
  );
};

export default React.memo(FlatListBasics);
